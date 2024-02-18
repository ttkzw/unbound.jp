---
title: Unbound - インストールと設定方法
---
<author>
  By W.C.A. Wijngaards, NLnet Labs, October 2008.
</author>

<p>
この文書はあなたのシステムでunboundをコンパイルして、インストールして、設定する方法を紹介します。
</p>

<h2>コンパイル</h2>
<p>
あなたが使っているディストリビューションのパッケージ マネージャがunboundのパッケージを扱っていたら、このステップをとばして、パッケージ マネージャでそのパッケージをインストールすることができます。
</p>
<p>
ソフトウェアをコンパイルするためには、opensslとそのincludeファイル（しばしばopenssl-develという名前のパッケージ名）がすでにインストールされている必要があります。./configure [オプション]; make; make installを実行してします。
</p>
<p>訳注：バージョン1.4.7以降ではlibexpatがインストールされている必要があります。
</p>
<p>
libldnsライブラリがインストールされていなければ、unboundのソースtarballに含まれているldnsが自動的に使われます。
</p><p>
configureのオプション。プログラムのインストール場所を<code>--prefix=/usr/local</code>で指定するように、様々なファイルとディレクトリのデフォルトの場所をカスタマイズできます。リンクするライブラリの場所は<code>--with-ldns=dir</code>や<code>--with-libevent=dir</code>や<code>--with-ssl=dir</code>で指定できます。調整をしたいのでなければ、./configureにはオプションは必要ないです。
</p>
<p>
BSDシステムでは、makeの代わりにgmakeを使う必要があります。
</p>
<p>
make installでインストールでき、make uninstallでアンインストールできます。アンインストールは設定ファイルを削除しません。
</p>
<p>
unboundのソースのcontribeディレクトリにはunboundのためのサンプルの（BSDとLinuxシステムの）rc.dスクリプトがあります。
</p>


<h2>設定</h2>

<p>
設定ファイルは<code>/usr/local/etc/unbound/unbound.conf</code>にコピーされます。しかし、ディストリビューションによっては<code>/etc/unbound/unbound.conf</code>や<code>/etc/unbound.conf</code>にコピーされます。設定ファイルには完全な注釈が付いています。目を通して、好きなオプションを選ぶことができます。あるいは、以下の設定を使うこともできます。これは、ローカル サブネットに提供する共通オプションの取り急ぎの設定です。
</p>
<p>
以下の設定はIPv4のサブネットとIPv6のlocalhostのDNSサービスの共通の設定です。利用するサブネットに一致するようにIPv4のサブネットを変更できます。さらに、IPv6を持っていればIPv6のサブネットを追加してください。
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre><span class="cm"># unbound.conf for a local subnet.</span>
server:
	interface: 0.0.0.0
	interface: ::0
        access-control: 192.168.0.0/16 allow 
	access-control: ::1 allow
        verbosity: 1
</pre>
</td></tr></tbody></table>
<p>
デフォルトでは、ソフトウェアはchrootが有効になっています。これはリモートからの攻撃に対する防御の追加のレイヤーを提供します。ファイルシステムのルート('<code>/</code>')で開始するフルパス名としてファイルのパスを入力します。chrootで問題が起きたら、設定ファイルに<code>chroot: ""</code>を設定することで無効にできます。
</p>
<p>
さらに、サーバは権限を落とすためのユーザを<code>unbound</code>とします。お好みのアカウント管理ツール(useradd(8))でこのユーザを追加したり、設定ファイルに<code>username: ""</code>を設定することでこの機能を無効にすることができます。
</p>
<p>
<code>/etc/rc.d/init.d/unbound start</code>のようなrc.dスクリプト（あなたやパッケージマネージャがインストールしたものがあればそれ）を使ってサーバを起動します。あるいはユーザrootとして<code>unbound -c &lt;config&gt;</code>を実行します。
</p>

<h3>リモート制御の設定</h3>
<p>
<code>unbound-control</code>を使ってリモート制御を行うことができます。まず、必要なTLS鍵ファイルを生成するために<code>unbound-control-setup</code>を実行します。鍵ファイルはデフォルトのインストール ディレクトリに配置されます。デーモンを実行させるためにユーザ名<code>unbound</code>を使うときには、サーバが鍵ファイルを読むのを許可するため、<code>sudo -u unbound unbound-control-setup</code>を使って鍵を生成します。設定ファイルの終わりに次の内容を追加してください。
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre><span class="cm"># enable remote-control</span>
remote-control:
        control-enable: yes 
</pre>
</td></tr></tbody></table>
<p>
これで、<code>unbound-control</code>を使ってデーモンにコマンドを送ることができます。鍵ファイルを読む必要があれば、<code>sudo unbound-control</code>を行う必要があります。デフォルトではlocalhostからの接続のみが許可されています。
</p>

<h3>追加情報</h3>
<p> 設定できることがたくさんあります: </p>
<ul>
<li><a href="http://unbound.jp/unbound/howto_anchor/">DNSSECを有効にする方法</a>。DNSSECの設定方法が書いてあります。これに従ってトラスト アンカーを追加する必要があります。 
</li><li><a href="http://www.unbound.net/documentation/patch_announce102.html">1.0.2 Patch announcement</a>は追加のセキュリティのための設定方法をカバーします。
</li><li><a href="http://unbound.jp/unbound/howto_optimise/">最適化の方法</a>。大規模環境で最大の性能を得る方法について議論します。
</li><li><a href="http://unbound.jp/unbound/howto_statistics/">統計方法</a>。サーバで統計を表示させる設定方法について議論します。
</li></ul>

<p>この文章は<a href="http://www.unbound.net/documentation/howto_setup.html">Unbound: Howto Setup and Install (www.unbound.net)</a>の翻訳です。[翻訳: 滝澤 隆史]</p>
