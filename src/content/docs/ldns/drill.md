---
title: drill(1)
---
<h1>drill</h1>

Section: User Commands (1)<br />
Updated: 28 May 2006<br />
<hr />
<h2>名前</h2>
<p>drill - DNSおよびDNSSECから（デバッグ）情報を取得する</p>
<h2>書式</h2>
<p><strong>drill</strong> [ <em>OPTIONS</em> ] <em>name</em> [ <em>@server</em> ] [ <em>type</em> ] [ <em>class</em> ]</p>
<h2>説明</h2>
<p><strong>drill</strong>はDNSからすべての種類の情報を取得するように設計されているツールです。特にDNSSECで利用されるように設計されています。</p>
<p><strong>drill</strong>という名前は<strong>dig</strong>のだじゃれです。<strong>drill</strong>では、<strong>dig</strong>よりもさらに多くの情報を取得することができます。</p>
<p>引数がなければ、デフォルトのクラス'IN'に、デフォルトのタイプ'A'にします。/etc/resolv.confで指定されたサーバがクエリーを送るのに使われます。</p>
<p><em>name</em> この名前を問い合わせます。</p>
<p><em>@server</em> このサーバにクエリーを送ります。指定されなければ、<em>/etc/resolv.conf</em>のネームサーバが使われます。</p>
<p><em>type</em> このRRタイプを尋ねます。コマンドラインでタイプが指定されなければ、デフォルトを'A'にします。ただし、逆引きを行うときにはデフォルトを'PTR'にします。</p>
<p><em>class</em> クエリーを行うときこのクラスを使います。</p>
<h2>利用例</h2>
<p><strong>drill mx miek.nl</strong> ドメインmiek.nlのMXレコードを表示します。</p>
<dl compact="compact">
<dt><strong>drill -S jelte.nlnetlabs.nl</strong></dt>
<dd>jelte.nlnetlab.nlドメインの署名を追跡します。このオプションはldnsがopensslサポートでコンパイルされているときのみ利用できます。</dd>
<dt><strong>drill -TD www.example.com</strong></dt>
<dd>ルートサーバからwww.example.comまでDNSSEC(-D)の追跡(-T)を行います。このオプションはldnsがopensslサポートでコンパイルされているときのみ働きます。</dd>
<dt><strong>drill -s dnskey jelte.nlnetlabs.nl</strong></dt>
<dd>jelte.nlnetlabs.nlのDNSKEYレコードを表示します。見つかったDNSKEYレコード毎にDSレコードも出力します。</dd>
</dl>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-D</strong></dt>
<dd>クエリーの際にDNSSECを有効にします。DNSSECのタイプ（DNSKEYやRRSIGやDSやNSEC）をクエリーするときでも、これは自動的には有効になりません。</dd>
<dt><strong>-T</strong></dt>
<dd>ルートサーバから<em>name</em>を<strong>追跡</strong>します。このオプションを使うとき、引数の@serverとタイプは使えません。</dd>
<dt><strong>-S</strong></dt>
<dd><strong>知っている鍵まで、あるいは可能な限りツリーの上位として'name'の署名を追跡します。</strong></dd>
<dt><strong>-V</strong> <em>level</em></dt>
<dd>より饒舌になります。送信された実際のクエリーを見るにはレベルを5に設定します。</dd>
<dt><strong>-Q</strong></dt>
<dd><strong>静かなモード。これは-Vオプションを無効にします。</strong></dd>
<dt><strong>-f</strong> <em>file</em></dt>
<dd>ファイルからクエリーを読み込みます。このクエリーは-wオプションでダンプされます。</dd>
<dt><strong>-i</strong> <em>file</em></dt>
<dd>ネットワークの代わりにファイルから回答を読み込みます。これはデバッギングを助け、ディスク上のクエリーが有効であるかを検証するために使われます。ファイルがバイナリ データを含んでいれば、ネットワークの順でのクエリーであると推定されます。</dd>
<dt><strong>-w</strong> <em>file</em></dt>
<dd>回答のパケットをファイルに書き出します。</dd>
<dt><strong>-q</strong> <em>file</em></dt>
<dd>クエリーのパケットをファイルに書き出します。</dd>
<dt><strong>-v</strong></dt>
<dd><strong>drillのバージョンを表示します。</strong></dd>
<dt><strong>-h</strong></dt>
<dd><strong>短いヘルプ メッセージを表示します。</strong></dd>
</dl>
<h3>クエリー オプション</h3>
<dl compact="compact">
<dt><strong>-4</strong></dt>
<dd><strong>IPv4を使います。IPv4が有効であるネームサーバにのみクエリーを送ります。</strong></dd>
<dt><strong>-6</strong></dt>
<dd><strong>IPv6を使います。IPv6が有効であるネームサーバにのみクエリーを送ります。</strong></dd>
<dt><strong>-a</strong></dt>
<dd><strong>回答が切り詰められて(TC=1)いたら、リゾルバの仕組みのフォールバック機構を使います。切り詰められたパケットを受け取って、このオプションが設定されていたら、drillはまずEDNS0バッファ サイズ 4096で新しいクエリーを送ります。</strong>
<p><strong>EDNS0バッファサイズがすでに512バイトより大きく設定されていたら、あるいは上記の再試行でも回答が切り詰められてたら、リゾルバの仕組みはTCPにフォールバックします。</strong></p>
</dd>
<dt><strong>-b</strong> <em>size</em></dt>
<dd>EDNS0の偽RRのバッファ サイズとしてsizeを使います。</dd>
<dt><strong>-c</strong> <em>file</em></dt>
<dd>ネームサーバの設定に/etc/resolv.confの代わりにfileを使います。</dd>
<dt><strong>-d</strong> <em>domain</em></dt>
<dd>追跡のときに(-T)、ルートの代わりにこのdomainから開始します。</dd>
<dt><strong>-t</strong></dt>
<dd><strong>サーバに問い合わせるときにTCPを使います。</strong></dd>
<dt><strong>-k</strong> <em>keyfile</em></dt>
<dd>（信頼済み）鍵を読み込むためにこのファイルを使います。このオプションが指定されたときには、<strong>drill</strong>はこの鍵で現在の回答を検証しようと試みます。追跡は行われません。<strong>drill</strong>が安全な追跡を行ったら、この鍵はトラスト アンカーとして使われます。DNSKEYあるいはDSレコードを含めることができます。
<p>代わりに、DNSSECが追跡（<strong>-TD</strong>）や署名の追跡（<strong>-S</strong>）を有効にしたとき、<strong>-k</strong>が指定されていなければ、そして、デフォルトのトラストアンカー（/etc/unbound/root.key）が存在して、有効なDNSKEYやDSレコードを含んでいたら、トラストアンカーとして使われます。</p>
</dd>
<dt><strong>-o</strong> <em>mnemonic</em></dt>
<dd>特定のヘッダ ビットを設定したり、解除したりするためにこのオプションを使います。大文字でビットのニーモニックを使うことでビットを設定します。小文字でニーモニックを与えることでビットを解除します。次のニーモニックを<strong>drill</strong>が理解できます:
<p><br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QR,&nbsp;qr:&nbsp;set,&nbsp;unset&nbsp;QueRy&nbsp;(default:&nbsp;on)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AA,&nbsp;aa:&nbsp;set,&nbsp;unset&nbsp;Authoritative&nbsp;Answer&nbsp;(default:&nbsp;off)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TC,&nbsp;tc:&nbsp;set,&nbsp;unset&nbsp;TrunCated&nbsp;(default:&nbsp;off)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RD,&nbsp;rd:&nbsp;set,&nbsp;unset&nbsp;Recursion&nbsp;Desired&nbsp;(default:&nbsp;on)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CD,&nbsp;cd:&nbsp;set,&nbsp;unset&nbsp;Checking&nbsp;Disabled&nbsp;&nbsp;(default:&nbsp;off)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RA,&nbsp;ra:&nbsp;set,&nbsp;unset&nbsp;Recursion&nbsp;Available&nbsp;&nbsp;(default:&nbsp;off)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AD,&nbsp;ad:&nbsp;set,&nbsp;unset&nbsp;Authenticated&nbsp;Data&nbsp;(default:&nbsp;off)</p>
<p>このように: <strong>-o CD</strong>はChecking Disabledを有効にします。これはキャッシュが与える回答を検証しないようにキャッシュ サーバに指示します。</p>
</dd>
<dt><strong>-p</strong> <em>port</em></dt>
<dd>デフォルトの53の代わりにこのポートを使います。</dd>
<dt><strong>-r</strong> <em>file</em></dt>
<dd>追跡時に（-Tオプション）、ルート サーバのヒント ファイルとしてこのファイルを使います。</dd>
<dt><strong>-s</strong></dt>
<dd><strong>DNSKEYに遭遇したときに、それに等しいDSも出力します。</strong></dd>
<dt><strong>-u</strong></dt>
<dd><strong>サーバに問い合わせるときにUDPを使います。これがデフォルトです。</strong></dd>
<dt><strong>-w</strong> <em>file</em></dt>
<dd>回答をこのファイルに書き出します。このファイルはクエリーの16進数のダンプを含みます。これは-fオプションと一緒に使うことができます。</dd>
<dt><strong>-x</strong></dt>
<dd><strong>逆引きを行います。タイプは使えません。PTRに設定されます。</strong></dd>
<dt><strong>-y</strong> <em>&lt;name:key[:algo]&gt;</em></dt>
<dd>名前を付けたbase64のTSIG鍵を指定します。さらに、オプションとしてアルゴリズムも指定できます。デフォルトはhmac-md5.sig-alg.reg.intです。</dd>
<dt><strong>-z</strong></dt>
<dd>クエリーを送る前にネームサーバの一覧をランダムにしません。</dd>
</dl>
<h2>ファイル</h2>
<dl compact="compact">
<dt>/etc/unbound/root.key</dt>
<dd><strong>-k</strong>オプションが指定されないときに、信頼済みの鍵が読み込まれるファイル。</dd>
</dl>
<h2>関連項目</h2>
<p><a href="../unbound-anchor/">unbound-anchor</a>(8)</p>
<h2>著者</h2>
<p>Jelte JansenとMiek Gieben. 二人ともNLnet Labs所属です。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>バグ</h2>
<h2>著作権</h2>
<p>Copyright (c) 2004-2008 NLnet Labs. Licensed under the revised BSD license. 無保証です。特定の目的のためへの品質や適合さえありません。</p>
<h2>関連項目</h2>
<p><strong>dig</strong>(1), <em>RFC403{3,4,5}</em>.</p>
<hr />
