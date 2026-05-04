+++
date = '2026-05-04T00:41:23+08:00'
draft = false
title = 'I黑最严厉的父亲！如何在Linux上游玩Neverness to Everness/《异环》，并使用Optiscale为Intel显卡强制打开超分辨率和插帧'
categories = ["折腾记录"]
tags = ["Linux", "Gaming", "Intel GPU"]
+++

最近看到很多关于这款新游戏的讨论，我也是非常想要一款城市题材的开放世界游戏，实现我在游戏中搭乘地铁和公交车的愿望，然而这款游戏并没有Linux支持，在我安装好后，发现这款游戏竟不对Intel显卡开放任何超分辨率和帧生成功能，参照很多教程后，我摸索出了在我这里成功工作的方法，遂写一篇文章，也是给自己一个备忘。
# 风险声明
- 本文所介绍到的方法可能具有时效性。
- **重要：在继续阅读之前，请务必认清以下事实**。
  - 本文介绍到的dwproton可能涉及绕过反作弊的补丁。
  - OptiScaler涉及注入DLL行为，”外挂“常常使用类似的手段，虽然OptiScaler的目的并非作弊，而是获得更好的视觉体验。但依然不排除此行为被视为作弊的可能。
  - 您的账号属于Perfect World，我无法担保本文介绍的行为不会被禁止，乃至因此被**封禁账号**。请谨慎行事，特别是当你的账号内有大额充值时。如果您因此遭受了处罚，请通过关于里的联系方式联系我，我会更新这篇博客。
- 本教材属于典型的“**黑盒折腾**”，本人并不能完全理解这中间的原理是什么，也不保证会不会因为运行环境的差异导致失败，也请比较懂的大佬多加指点与斧正。
- 本文所描述方法仅在本人所用环境下测试过，下面是我的fastfetch输出                                        
                                                                  
<details>
<summary>fastfetch</summary>

```             .',;::::;,'.                 yuyuyuyu_an@Fedora
         .';:cccccccccccc:;,.             ------------------
      .;cccccccccccccccccccccc;.          OS: Fedora Linux 44 (KDE Plasma Desktop Edition) x86_64
    .:cccccccccccccccccccccccccc:.        Host: AB-B760M D2H
  .;ccccccccccccc;.:dddl:.;ccccccc;.      Kernel: Linux 6.19.14-300.fc44.x86_64
 .:ccccccccccccc;OWMKOOXMWd;ccccccc:.     Uptime: 7 hours, 28 mins
.:ccccccccccccc;KMMc;cc;xMMc;ccccccc:.    Packages: 3217 (rpm), 8 (flatpak)
,cccccccccccccc;MMM.;cc;;WW:;cccccccc,    Shell: bash 5.3.9
:cccccccccccccc;MMM.;cccccccccccccccc:    Display (H28F31Z): 3840x2160 @ 1.25x in 28", 60 Hz [External]
:ccccccc;oxOOOo;MMM000k.;cccccccccccc:    DE: KDE Plasma 6.6.4
cccccc;0MMKxdd:;MMMkddc.;cccccccccccc;    WM: KWin (Wayland)
ccccc;XMO';cccc;MMM.;cccccccccccccccc'    WM Theme: Breeze 微风
ccccc;MMo;ccccc;MMW.;ccccccccccccccc;     Theme: Breeze (Dark) [Qt], Breeze-Dark [GTK2], Breeze [GTK3]
ccccc;0MNc.ccc.xMMd;ccccccccccccccc;      Icons: breeze-dark [Qt], breeze-dark [GTK2/3/4]
cccccc;dNMWXXXWM0:;cccccccccccccc:,       Font: Noto Sans (10pt) [Qt], Noto Sans (10pt) [GTK2/3/4]
cccccccc;.:odl:.;cccccccccccccc:,.        Cursor: breeze (24px)
ccccccccccccccccccccccccccccc:'.          Terminal: konsole 26.4.0
:ccccccccccccccccccccccc:;,..             CPU: 12th Gen Intel(R) Core(TM) i5-12600KF (16) @ 4.90 GHz
 ':cccccccccccccccc::;,.                  GPU: Intel Arc A750 @ 2.40 GHz [Discrete]
                                          Memory: 12.79 GiB / 31.16 GiB (41%)
                                          Swap: 2.97 GiB / 40.00 GiB (7%)
                                          Disk (/): 653.21 GiB / 896.93 GiB (73%) - btrfs
                                          Local IP (enp6s0): 192.168.1.2/24
                                          Locale: zh_CN.UTF-8                                                            
                                          
```
                                          
</details>



# 安装游戏

经过本人测试，只有dwproton可以安装游戏，其它版本的Proton可能在安装游戏过程中无法选择路径，或被Anti-Cheat Expert阻止。接下来我将使用Lutris和ProtonPlus来图形化安装。
1. 先前准备：安装[Lutris](https://lutris.net/downloads)和[ProtonPlus](https://protonplus.vysp3r.com/)以图形化配置，当然最重要的是下载[Neverness to Everness](https://nte.perfectworld.com)的安装程序。

2. 在ProtonPlus中，选择运行器，在右上角将应用改成Lutris，在Proton中找到DW-Proton，安装dwproton-10.0-26（截止本文发布，还没有更新的版本，或许当更新的版本发布时也可以）。
![ProtonPlus演示图片](/ProtonPlus.png)

3. 在Lutris中，单击左上角的+添加游戏，选择手动配置游戏运行环境，然后在弹出的窗口中，填写名称，将运行环境选为Wine（运行Windows游戏）,在游戏选项中选择自己记得住的工作目录和容器目录，同一个即可，暂且将自己的主程序设为你下载的游戏启动器安装程序，在运行环境选项中选择Wine版本为dwproton-10.0-26，其他选项保持默认便可。
![Lutris添加](/Lutrisadd.png)![Lutris游戏选项](/Lutrisgameoption.png)![Lutris运行环境选项](/Lutrisenvironmentoption.png)

4. 点击保存，然后启动游戏，然后你应该能看到语言选择，点击OK后你应该能看到启动器安装指引，在我这里安装位置的盘符总不是C，甚至可能会显示一个我未曾映射过为主机路径的盘符，本人喜欢游戏文件就在Wine Prefix中，遂选择自定义安装，将盘符改为C。
![游戏安装](/nteinstallation.png)

5. 安装完成后，去你安装的路径里找到NTEGlobalLauncher.exe，将启动旁的三角-配置-游戏选项中的主程序改为这个文件，这样下次启动启动的就是安装好的启动器而不是安装程序了，如果你不知道Wine容器中的盘符对应主机的哪个路径，可以点击酒杯旁的三角-Wine设置，从中找到驱动器，然后你就可以看到盘符和目标文件夹的对应关系了。

6. 启动，并安装游戏，等待下载完成。

7. 在NTE启动器里点击开始游戏，我这里总会在编译着色器这一步崩溃，我尝试启用了游戏使用DX11，的确使我进入了登录界面，结果当我退出后将游戏使用DX11关闭后，竟然神奇地可以在DX12（VKD3D转译）下启动了。

8. 如果你对游戏的运行效率满意，就请享受吧。
   - 若不满意，请看下文。

# 安装OptiScaler以强制支持超分辨率和插帧

1. 先前准备：在[OptiScaler的Releases中下载发布的压缩包（不是Source code）](https://github.com/optiscaler/OptiScaler/releases/latest)。

2. 找到你游戏容器目录里的drive_c/users/steamuser/AppData/Local/HT/Saved_Global/Config/Windows/Engine.ini，使用文本编辑器（我使用的是kate，你也可以根据自己的习惯使用nano或vim）打开它，然后移除所有原本的文本，替换成下面这段：

```
[SystemSettings]
r.FidelityFX.FSR3.UseNativeDX12=1
r.FidelityFX.FSR3.UseRHI=0
```

3. 将压缩包内所有文件复制，粘贴到游戏安装路径/Neverness To Everness/Client/WindowsNoEditor/HT/Binaries/Win64/中，并赋予setup_linux.sh执行权限。

4. 在这个路径打开终端（也可以打开终端后cd到这个路径），然后执行./setup_linux.sh，这个配置是我测试过可用FSR 3的，如果在第一个问题中选择1，会被反作弊阻止，如果在第三个问题中选择Y，将在游戏中可用DLSS，但不支持帧生成。

```
 ::::::::  :::::::::  ::::::::::: :::::::::::  ::::::::   ::::::::      :::     :::        :::::::::: :::::::::  
:+:    :+: :+:    :+:     :+:         :+:     :+:    :+: :+:    :+:   :+: :+:   :+:        :+:        :+:    :+: 
#+:    +:+ +:+    +:+     +:+         +:+     +:+        +:+         +:+   +:+  +:+        +:+        +:+    +:+ 
+#+    +:+ +#++:++#+      +#+         +#+     +#++:++#++ +#+        +#++:++#++: +#+        +#++:++#   +#++:++#:  
+#+    +#+ +#+            +#+         +#+            +#+ +#+        +#+     +#+ +#+        +#+        +#+    +#+ 
#+#    #+# #+#            #+#         #+#     #+#    #+# #+#    #+# #+#     #+# #+#        #+#        #+#    #+# 
 ########  ###            ###     ###########  ########   ########  ###     ### ########## ########## ###    ### 

Coping is strong with this one...


Choose a filename for OptiScaler (default is dxgi.dll):
 [1] dxgi.dll
 [2] winmm.dll
 [3] version.dll
 [4] dbghelp.dll
 [5] d3d12.dll
 [6] wininet.dll
 [7] winhttp.dll
 [8] OptiScaler.asi
Enter 1-8 (or press Enter for default): 2

Are you using an Nvidia GPU [y/N]: N

Will you try to use DLSS inputs? (enables spoofing, required for DLSS FG, Reflex->AL2) [Y/n]: N
```

5. 在配置-系统选项中，找到环境变量，添加一行，修改Key为WINEDLLOVERRIDES=winmm.dll，Valve为n,b。
![Lutris设置环境变量](/Lutrisenvironmentvariable.png)
> 这里的PROTON_ENABLE_WAYLAND=1只是为了启用原生Wayland，可忽略

6. 使用文本编辑器打开OptiScaler.ini，找到[Spoofing]，更改SpoofedVendorId,SpoofedDeviceId和SpoofedGPUName来将自己的显卡伪装成AMD Radeon RX 9070 XT。

```
; -------------------------------------------------------
; VendorID to spoof 
; 0x10de = Nvidia | 0x8086 = Intel | 0x1002 = AMD
; Integer value - Default (auto) is 0x10de 
SpoofedVendorId = 0x1002

; DeviceID to spoof 
; 0x2684 = 4090 | 0xE20B = B580 | 0x7550 9070 XT
; Integer value - Default (auto) is 0x2684 (4090)
SpoofedDeviceId = 0xe208

; Spoofed GPU name
; NVIDIA GeForce RTX 4090 | Intel(R) Arc(TM) B580 Graphics | AMD Radeon RX 9070 XT
; Default (auto) is NVIDIA GeForce RTX 4090
SpoofedGPUName = AMD Radeon RX 9070 XT
```
7. 启动游戏，如果按下Insert后显示了OptiScaler GUI，就说明OptiScaler成功安装了。
![游戏内OptiScaler GUI截图](/InNTEGame1.png)
![游戏内设置](/NTESetting.png)

8. FSR3只有NativeAA和质量档，而质量档的帧率依然不能满足我，因此我在OptiScale GUI中的Upscale Ratio Override，启用Override all，并更改All Ratios为2.000，这个值控制实际渲染画面的线性像素数与游戏窗口的线性像素数，越大越快但画面质量越低。如图，我这里为1920x1080 -> 3840x2160，虽然游戏无基准测试，但是根据我的个人体验，我的Intel Arc A750在这种情况下帧率依然很难达到60fps，可见这款游戏对GPU的要求还是不低的。
