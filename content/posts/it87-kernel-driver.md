+++
date = '2026-07-19T21:36:25+08:00'
draft = false
title = '解决Linux无法驱动IT8613E导致的无法控制主板上接的风扇转速的问题记录'
categories = ["折腾记录"]
tags = ["Linux", "PC DIY"]
+++


我曾经购买过一块升技（虽然曾经是个正经牌子，但是早在我出生之前黄了，现在在华强北秽土转生，也没有和Intel的合作伙伴关系）的AB-B760M D2H主板（根据codeyuri视频里的信息，这款主板应该是昂讯所制造，而昂讯是Intel的合作伙伴，所以芯片组之类的来源应该正当），作为一款“寨板”，也存在寨板普遍的固件和支持不及大品牌的问题。就比如这个极其落后的风扇温控：
![UEFI设置界面演示图片](/IMG_20260719_220228.jpg)
![UEFI设置界面演示图片](/IMG_20260719_220300.jpg)
如你所见，不像大品牌主板那样有图表，只能靠这种十分依赖抽象思考能力的几个选项，而且只能有一条斜线，这条斜线的斜率还被限制在2的整数次方。所以有必要依靠系统内运行程序来控制转速，特别是我发现我的系统风扇对显卡温度的影响较大（是过热降频或否的区别），而主板自己的温控只能以CPU温度作为自变量，导致在GPU压力很大，但是CPU压力不大的场景，如果不让系统风扇轻易满速，GPU就会过热降频，以至于我常常直接把这个系统风扇设置成满速，导致任何时候噪音就很大。

但是，我的系统检测（包括`sensors-detect`或其它GUI工具）不到包括主板上接的任何风扇。直到最近我才发现是主线内核并没有我这主板上的IT8613E Super I/O chip。而这里有一个非主线的内核模块<https://github.com/frankcrawford/it87>可以为我的Super I/O提供支持，但实测需要额外为此内核模块应用ignore_resource_conflict参数（可参考[Arch Wiki](https://wiki.archlinuxcn.org/wiki/%E5%86%85%E6%A0%B8%E6%A8%A1%E5%9D%97#%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%9D%97%E5%8F%82%E6%95%B0)或运行`sudo modprobe it87 ignore_resource_conflict`，确认工作后创建`/etc/modprobe.d/it87.conf`，写入`options it87 ignore_resource_conflict=1`)，否则不工作。

## COPR仓库

如果你使用以rpm作为软件包的发行版（如基于RHEL的、Fedora、CentOS Stream或OpenEuler），你可以通过我维护的一个[COPR仓库](https://copr.fedorainfracloud.org/coprs/yuyuyuyu-an/it87-dkms/)安装这个内核模块。只需要运行下面的命令。

```
sudo dnf copr enable yuyuyuyu-an/it87-dkms
sudo dnf install it87-dkms
```

**注**：不知为何上游it87的维护者在README中写道（ignore_resource_conflict这个选项）**can result in boot failures on some systems**，倘若真的无法启动，请在你的GRUB菜单里寻找类似“Recovery Mode”“Safe Mode”或类似意思的选项，并在进入后删除/etc/modprobe.d/it87.conf，以确保系统可以正常启动，此外，请联系我以便我修复这个问题。

