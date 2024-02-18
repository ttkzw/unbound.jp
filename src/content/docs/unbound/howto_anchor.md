---
title: Unbound - DNSSECを有効にする方法
---
<author>
  By W.C.A. Wijngaards, NLnet Labs, August 2010.
</author>
<p>
DNSSECはDNSのデータを保護するため仕組みです。デジタル署名を使っています。
DNSSECを利用するためには公開鍵の設定が必要です。以下で説明します。
</p>
<p>
以下に示すのはルートゾーンの2010年のトラストアンカーです。
信頼されたコミュニティの代表者が認証したルートアンカーを検証してください。
そのうちの一つはここにあります（PGP鍵により署名されている）: <a href="http://www.nlnetlabs.nl/downloads/DS-20100616.txt">Olaf KolkmanによるDNSSECのルート鍵の宣言</a>
（PGPとHTTPS）で安全な<a href="https://data.iana.org/root-anchors/">iana website</a>から公開されているルート鍵をダウンロードすることもできます。
</p>

<p>訳注：ここからはUnbound 1.4.6以前の場合です。</p>
<p>
次のような内容を（1行で）記述したファイル<code>/etc/unbound/root.key</code>を作成します。Unboundがそのファイルを読み書きできるようにし、最新の鍵に常に保つようにしてください。unboundデーモンがアクセスできれば、そのファイルをどこに置いてもかまいません。デーモンが<code>/var/unbound</code>あるいは<code>/usr/local/etc/unbound</code>から起動するのであれば、そこに置いてもよいでしょう。
</p>
<table border-collapse="collapsed" style="font-size: 11px;" border="1"><tbody><tr><td>
<pre>
. IN DS 19036 8 2 49AAC11D7B6F6446702E54A1607371607A1A41855200FD2CE1CDDE32F24E8FB5
</pre>
</td></tr></tbody></table>

<p>訳注：ここからはUnbound 1.4.7以降の場合です。</p>
<p>訳者追記：Unbound 1.4.7以降では次のように<a href="../unbound-anchor/">unbound-anchor</a>コマンドを使ってルートゾーンのトラストアンカーを取得してroot.keyファイルを生成できます。Unboundデーモンがそのファイルを読み書きできるようにファイルの生成後にファイルの所有者を変更してください。
<pre># unbound-anchor -a "/etc/unbound/root.key"
# chown unbound:unbound /etc/unbound/root.key
</pre>
</p>

<p>訳注：以降、共通。</p>
<p>
設定ファイルに、次のように自動更新されるアンカーの設定にルートアンカーファイルを含めてください。
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre>server:
	# chroot disabled here as example, to make pathnames work
	chroot: ""
	directory: "/etc/unbound"

	# root key file, automatically updated
	auto-trust-anchor-file: "/etc/unbound/root.key"
</pre>
</td></tr></tbody></table>

<p>
設定を変更したら、unboundを再起動します。unboundは（鍵が見つかった最新時刻のような）状態の情報と共に鍵ファイルを上書きします。長い間（数ヶ月のオフライン）接続していなければ、RFC5011 rollover tracking standardは機能しないでしょう。
</p>
<p>
それから<code>dig . SOA +dnssec</code>を実行したら、結果の出力にADフラグが見えるはずです。
</p>

<p>この文章は<a href="http://www.unbound.net/documentation/howto_anchor.html">Unbound: Howto enable DNSSEC (www.unbound.net)</a>の翻訳です。[翻訳: 滝澤 隆史]</p>
