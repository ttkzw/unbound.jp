---
title: unbound-host(1)
---
<h1>unbound-host</h1>
<p>Section: unbound 1.4.17 (1)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p><strong>unbound-host</strong> - unbound DNS検索ユーティリティ</p>
<h2>書式</h2>
<p><strong>unbound-host</strong> [<strong>-vdhr46</strong>] [<strong>-c</strong> <em>class</em>] [<strong>-t</strong> <em>type</em>] <em>hostname</em> [<strong>-y</strong> <em>key</em>] [<strong>-f</strong> <em>keyfile</em>] [<strong>-F</strong> <em>namedkeyfile</em>] [<strong>-C</strong> <em>configfile</em>]</p>
<h2>説明</h2>
<p><strong>unbound-host</strong>はホスト名を問い合わせて、結果を表示するためにunbound検証機能付きリゾルバを使います。<strong>-v</strong>オプションを付けると、secure, insecure, bogus (security failure)といった検証の状態を表示します。</p>
<p>デフォルトでは、設定ファイルをまったく読みません。インターネット ルート サーバーにアクセスしようとします。<strong>-C</strong>でunbound設定ファイルが、<strong>-r</strong>でresolv.confが読み込まれます。</p>
<p>利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><em>hostname</em></dt>
<dd>（DNSで検索して）この名前の解決が行われます。IPv4やIPv6アドレスが与えられたら、逆引き検索が行われます。</dd>
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-v</strong></dt>
<dd>饒舌な出力を有効にし、行毎に検証結果を表示します。secureはNXDOMAIN（そのようなドメイン名はない）やnodata（そのようなデータはない）や正当なデータ応答が鍵のうちの一つで正しく検証されたことを意味します。insecureはそのドメイン名がセキュリティの設定がないことを意味します。bogus (security failure) は応答が一つ以上の検証に失敗することを意味します。その失敗は間違ってる、期限切れである、改ざんされている、壊れている、などです。</dd>
<dt><strong>-d</strong></dt>
<dd>標準エラーへのデバッグ出力を有効にします。一つの-dはリゾルバとバリデータが行っていることを表示し、何が起こっているかをあなたに伝えます。"-d -d"のように何回も-dを付けると、パケットの送受信毎にたくさん出力します。</dd>
<dt><strong>-c</strong> <em>class</em></dt>
<dd>検索するクラスを指定します。デフォルトではインターネットクラスINです。</dd>
<dt><strong>-t</strong> <em>type</em></dt>
<dd>検索するデータのタイプを指定します。デフォルトはIPv4、IPv6、メール ハンドラー データ、逆引きのドメイン名ポインタです。</dd>
<dt><strong>-y</strong> <em>key</em></dt>
<dd>トラスト アンカーとして使用する公開鍵を指定します。これは、応答メッセージを検証するために、トラスト アンカーから応答まで構築された信頼の連鎖の基になります。DSレコードあるいはDNSKEYレコードを与えます。例えば、 -y "example.com DS 31560 5 1 1CFED84787E6E19CCF9372C1187325972FE546CD"となります。</dd>
<dt><strong>-f</strong> <em>keyfile</em></dt>
<dd>ファイルから鍵を読みます。ファイルの各行は-yと同じ形式でDSレコードあるいはDNSKEYレコードを持ちます。これはdigやdrillが生成するのと同じゾーンファイルの形式です。</dd>
<dt><strong>-F</strong> <em>namedkeyfile</em></dt>
<dd>BIND形式のnamed.confファイルから鍵を読みます。trusted-key {}; エントリのみ読まれます。</dd>
<dt><strong>-C</strong> <em>configfile</em></dt>
<dd><em><a href="../libunbound/">libunbound</a></em>(3)に渡すために、指定したunbound.confを使用します。</dd>
<dt><strong>-r</strong></dt>
<dd>/etc/resolv.confを読み、（DHCPにより設定された）フォワードDNSサーバーを使用します。詳しくは<em>resolv.conf</em>(5)を読んでください。そのサーバーがDNSSECをサポートしていなければ、検証を中断します。</dd>
<dt><strong>-4</strong></dt>
<dd>パケットを送るのにIPv4ネットワークのみを使います。</dd>
<dt><strong>-6</strong></dt>
<dd>パケットを送るのにIPv6ネットワークのみを使います。</dd>
</dl>
<h2>例</h2>
<p>使用例を示します。下に示した鍵は偽物です。そのため、security failureが起こります。</p>
<p>$ unbound-host www.example.com</p>
<p>$ unbound-host -v -y "example.com DS 31560 5 1 1CFED84787E6E19CCF9372C1187325972FE546CD" www.example.com</p>
<p>$ unbound-host -v -y "example.com DS 31560 5 1 1CFED84787E6E19CCF9372C1187325972FE546CD" 192.0.2.153</p>
<h2>終了コード</h2>
<p>unbound-hostプログラムはエラーのときにはステータスコード1で、エラーがないときにはエラーステータス0で終了します。データは終了コード0で利用できないかもしれません。終了コード1は検索でfatal errorが起きたことを意味します。</p>
<h2>関連項目</h2>
<p><em><a href="../unbound.conf/">unbound.conf</a></em>(5), <em><a href="../unbound/">unbound</a></em>(8).</p>
<hr />
