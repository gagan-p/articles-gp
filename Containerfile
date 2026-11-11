
# Containerfile — articles-gp render toolchain
# Why: one prebuilt image replaces per-run installs and the fragile
#      single-binary caches. Rebuilt only when this file changes.
# Target: linux/amd64 (GitHub ubuntu-latest runners, WSL2 local).

# ── Stage 1: compile svgbob once, keep only the binary ─────────────
FROM docker.io/library/rust:1-slim AS svgbob
RUN cargo install --locked svgbob_cli

# ── Stage 2: the tool image ────────────────────────────────────────
FROM docker.io/library/ubuntu:24.04
LABEL org.opencontainers.image.source=https://github.com/gagan-p/articles-gp
SHELL ["/bin/bash", "-euo", "pipefail", "-c"]
ENV DEBIAN_FRONTEND=noninteractive

# apt: groff (pic/eqn/chem) · asymptote · pikchr · graphviz · ditaa
#      gnuplot · plantuml · Java (ditaa/plantuml) · R + compilers
#      (CRAN builds from source) · Python
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl git perl ghostscript \
      groff asymptote pikchr-cli graphviz ditaa gnuplot-nox plantuml \
      default-jre-headless r-base r-base-dev librsvg2-dev libuv1-dev \
      python3 python3-venv \
 && ln -s /usr/bin/pikchr-cli /usr/local/bin/pikchr \
 && rm -rf /var/lib/apt/lists/*

# Quarto, pinned to the version the workflows already use
ARG QUARTO_VERSION=1.8.27
RUN curl -fsSL -o /tmp/quarto.deb \
      "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/quarto-${QUARTO_VERSION}-linux-amd64.deb" \
 && dpkg -i /tmp/quarto.deb && rm /tmp/quarto.deb

# TinyTeX under /opt, not $HOME: GitHub container jobs set
# HOME=/github/home, which would hide a ~/.TinyTeX install.
ENV PATH=/opt/.TinyTeX/bin/x86_64-linux:$PATH
RUN curl -fsSL https://yihui.org/tinytex/install-bin-unix.sh \
      | TINYTEX_DIR=/opt sh \
 && tlmgr install pgf standalone preview

# D2 diagram tool
RUN curl -fsSL https://d2lang.com/install.sh | sh -s -- --prefix /usr/local

# svgbob from stage 1
COPY --from=svgbob /usr/local/cargo/bin/svgbob_cli /usr/local/bin/svgbob

# Python in a venv (Ubuntu 24.04 blocks system-wide pip)
ENV PATH=/opt/venv/bin:$PATH QUARTO_PYTHON=/opt/venv/bin/python
RUN python3 -m venv /opt/venv \
 && pip install --no-cache-dir jupyter matplotlib pandas numpy

# R packages; library() calls fail loudly if an install silently failed
RUN Rscript -e "install.packages(c('knitr','rmarkdown','remotes','pikchr'), repos='https://cloud.r-project.org')" \
 && Rscript -e "remotes::install_github('elipousson/d2r')" \
 && Rscript -e "library(knitr); library(pikchr); library(d2r)"

# Quarto extensions; render.yml copies these into _extensions/
RUN mkdir -p /opt/quarto-extensions && cd /opt/quarto-extensions \
 && printf 'project:\n  type: default\n' > _quarto.yml \
 && quarto add --no-prompt quarto-ext/pikchr \
 && quarto add --no-prompt mcanouil/quarto-d2

# Fail the build by name if any tool is missing from PATH
RUN for t in quarto groff pic eqn chem asy pikchr d2 dot ditaa \
             gnuplot plantuml svgbob R python tlmgr pdflatex; do \
      command -v "$t" >/dev/null || { echo "MISSING: $t" >&2; exit 1; }; \
    done && echo "all tools present"

