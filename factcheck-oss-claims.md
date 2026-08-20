# Fact-check results — Chinese open-source claims (verified 2026-08-20)

1. CLAIM: OceanBase initiated inside Alibaba Group in 2010 (Yang Zhenkun), first deployed Taobao Favorites ~2011; Ant adopted later (Oracle replacement 2015-2016). "Ant built OceanBase from scratch in 2010" is imprecise.
   VERDICT: TRUE (claim as stated is correct; the essay's correction is right)
   EVIDENCE: Wikipedia OceanBase: "development of OceanBase was initiated internally at Alibaba in 2010, led by Dr. Yang Zhenkun"; "In 2011, OceanBase version 0.3 ... first deployed in Taobao's 'Favorites' feature"; "Alipay entirely migrated its core accounting system to OceanBase ... During the 2016 Singles' Day festival, OceanBase ... processing 100% of the payment traffic ... marked the completion of Alibaba's large-scale internal initiative to replace Oracle databases."
   SOURCE: https://en.wikipedia.org/wiki/OceanBase

2. CLAIM: OceanBase open-sourced June 2021 under MulanPubL-2.0; is it now Apache-2.0? When relicensed?
   VERDICT: TRUE — initial license MulanPubL-2.0; NOW Apache-2.0; relicensed 2026-03-27.
   EVIDENCE: GitHub API (2026-08-20): license.spdx_id = "Apache-2.0". LICENSE file git history: initial commit "init push" 2021-05-31 contains "木兰公共许可证, 第2版" (Mulan Public License v2); commit 5236c2b309 "Merge branch 'task/2026032000114758983'" dated 2026-03-27 replaces the Mulan text with the Apache License 2.0 text (201 additions / 188 deletions). Repo created 2021-05-31 (public announcement June 1, 2021).
   SOURCE: https://api.github.com/repos/oceanbase/oceanbase ; https://github.com/oceanbase/oceanbase/commits/master/LICENSE

3. CLAIM: OceanBase associated with OpenAtom Foundation (donated?), NOT an ASF TLP. RocketMQ is the Apache TLP (Alibaba, donated 2016, TLP 2017).
   VERDICT: PARTLY FALSE / PARTLY TRUE.
     - OceanBase is NOT an OpenAtom Foundation project: absent from OpenAtom's official project list (openatom.org lists openEuler, OpenHarmony, Anolis OS, Tongsuo, etc. — no OceanBase). No donation news found. OceanBase is operated by Beijing OceanBase Technology Co. (北京奥星贝斯科技), an Ant Group spinoff (independent company since June 2020). Correct: it is NOT an ASF project — that part is true, but the OpenAtom association is wrong/unverifiable.
     - RocketMQ: TRUE. Alibaba donated RocketMQ to Apache Incubator Nov 21, 2016; ASF announced it a Top-Level Project Feb 20, 2017. rocketmq.apache.org self-identifies as "Apache Top-Level Project".
   SOURCE: https://www.openatom.org/ ; https://en.wikipedia.org/wiki/Apache_RocketMQ ; https://rocketmq.apache.org/

4. CLAIM: Hadoop created by Doug Cutting & Mike Cafarella at Yahoo! (inspired by Google GFS/MapReduce papers) — NOT by Baidu.
   VERDICT: TRUE.
   SOURCE: https://en.wikipedia.org/wiki/Apache_Hadoop (infobox: "Original authors: Doug Cutting, Mike Cafarella"; developed at Yahoo! after Google's GFS (2003) and MapReduce (2004) papers; named after Cutting's son's toy elephant. No Baidu involvement.)

5. CLAIM: ByteDance ByteKV is an internal distributed KV store, never open-sourced.
   VERDICT: TRUE (as of 2026-08-20).
   EVIDENCE: GitHub global search "bytekv" returns only unrelated third-party projects; github.com/bytedance org has no ByteKV repository (KV-related repos: terarkdb, InfiniStore — different systems). No public ByteKV release exists anywhere.
   SOURCE: https://api.github.com/search/repositories?q=bytekv ; https://github.com/bytedance

6. CLAIM: Huawei was the #1 contributor to Linux kernel 5.10 (Dec 2020) by changesets (LWN 5.10 development statistics).
   VERDICT: TRUE — with metric precision: #1 by CHANGESETS among employers; Intel was #1 by lines changed.
   EVIDENCE: LWN "Statistics from the 5.10 kernel development cycle" (Jonathan Corbet, Dec 14, 2020): "Most active 5.10 employers — By changesets: Huawei Technologies 1434 (8.9%), Intel 1297 (8.0%) ...". "By lines changed: Intel 96976 (12.6%), Huawei Technologies 41049 (5.3%) ...".
   SOURCE: https://lwn.net/Articles/839772/

7. CLAIM: OpenHarmony/openEuler primary repo hosting 2025-26: Gitee? AtomGit? GitCode?
   VERDICT: RESOLVED — both migrated OFF Gitee to the OpenAtom GitCode/AtomGit platform (the two domains serve the same platform; pages on both domains are branded "AtomGit" and return identical content).
     - OpenHarmony: org announcement on atomgit.com/openharmony (and gitcode.com/openharmony): "OpenHarmony社区已完成整体迁移至GitCode平台" dated 2025-09-16 (community completed full migration to GitCode). Repos actively updated (minutes ago). Gitee org still exists but is legacy/mirror.
     - openEuler: migrated to AtomGit — gitee.com/openeuler/kernel description literally reads "本项目已经迁移至 AtomGit || This project has been migrated to AtomGit || Linked: https://atomgit.com/openeuler/kernel". openEuler org README points code repos to https://atomgit.com/openeuler and src-openeuler.
   SOURCE: https://atomgit.com/openharmony ; https://gitcode.com/openharmony ; https://gitee.com/openeuler/kernel

8. CLAIM: openGauss = PostgreSQL-compatible, open-sourced 2020 by Huawei; Anolis OS (OpenAnolis) = Alibaba's Linux; Tencent tlinux exists.
   VERDICT: TRUE (all three).
     - openGauss: enterprise-grade open-source RDBMS by Huawei, released under Mulan PSL v2, open-sourced June 30, 2020; its kernel/SQL dialect is PostgreSQL-derived (PostgreSQL-compatible) — widely documented.
     - Anolis OS: OpenAnolis community founded Sept 2020; OpenAtom Foundation lists Anolis OS with donor "OpenAnolis社区（由阿里云计算有限公司、统信软件技术有限公司代表捐赠）" — i.e., donated by Alibaba Cloud and UnionTech. Alibaba's Linux distribution (CentOS-compatible).
     - Tencent tlinux: exists as TencentOS — github.com/Tencent/TencentOS-kernel ("腾讯针对云的场景研发的服务器操作系统").
   SOURCE: https://opengauss.org/en/ ; https://openanolis.cn/ ; https://www.openatom.org/ ; https://github.com/Tencent/TencentOS-kernel
