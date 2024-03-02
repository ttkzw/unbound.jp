---
title: NSD
sidebar:
    order: 1
---
NSD (Name Server Daemon) は高性能で簡単なオープンソースの権威ネームサーバです。

NSDはRFCに準拠した権威ネームサーバです。最初にルートサーバのシステムによって使用されるネームサーバ実装に関して、より遺伝子の多様性を考慮するために考えられました。そして、速度と信頼性と安定性とセキュリティが高く重要である環境における操作のために開発されました。NSDは現在k.root-servers.netのようなルートサーバで使われています。さらに、いくつかのトップレベル ドメインのレジストリでも使われています。

NSDはNLnet LabsとRIPE NCCの共同チームにより作られました。

## 日本語マニュアル

日本Unboundユーザ会が翻訳したNSDのマニュアルです。

- [nsd(8)](/nsd4/nsd/) - デーモン
- [nsd.conf(5)](/nsd4/nsd-conf/) 設定ファイル
- [nsd-checkconf(8)](/nsd4/nsd-checkconf/) - nsd.confをチェックするプログラム
- [nsd-control(8)](/nsd4/nsd-control/) - nsdリモートサーバー制御ユーティリティ

少し情報は古いですが、NSD 4.0.0beta4の時点での滝澤が調べた情報をまとめた資料を紹介します。滝澤が独自で調べたため、間違っているかもしれませんがご容赦ください。

<iframe src="http://www.slideshare.net/slideshow/embed_code/16708977" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/ttkzw/unboundnsdosc-2013-tokyospring-16708977" title="Unbound/NSD最新情報（OSC 2013 Tokyo/Spring）" target="_blank">Unbound/NSD最新情報（OSC 2013 Tokyo/Spring）</a> </strong> from <strong><a href="http://www.slideshare.net/ttkzw" target="_blank">Takashi Takizawa</a></strong> </div>
