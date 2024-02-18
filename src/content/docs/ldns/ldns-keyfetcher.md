---
title: ldns-keyfetcher(1)
---
<h1>ldns-keyfetcher</h1>
<p>Section: User Commands (1)<br />Updated: 4 Apr 2006<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-keyfetcher - ゾーンのDNSSEC DNSKEYを取得する</p>
<h2>書式</h2>
<p><strong>ldns-keyfetcher</strong> [ <em>OPTIONS</em> ] <em>DOMAIN</em></p>
<h2>説明</h2>
<p><strong>ldns-keyfetcher</strong>はゾーンのDNSKEYを取得するために使われます。</p>
<p>まず、ルートから追跡して、ゾーンのすべての権威ネームサーバを見つけます。それから、すべての権威ネームサーバはゾーンの頂点のDNSKEY RRsetを（TCPを使って）問い合わせが行われます。結果がすべて同じであれば、鍵のRRsetが出力されます。</p>
<h2>オプション</h2>
<p><strong>-4</strong> IPv4のみを使います。</p>
<p><strong>-6</strong> IPv6のみを使います。</p>
<p><strong>-h</strong> ヘルプを出力して、終了します。</p>
<p><strong>-i</strong> 安全でないモード; DNSKEYのみの問い合わせを行います。すべての権威ネームサーバの多面的な確認がありません。</p>
<p><strong>-v</strong> <em>verbosity</em></p>
<p>饒舌さのレベルを設定します。次のレベルが利用可能です:</p>
<p><br />
&nbsp;0:&nbsp;デフォルト。DNSKEY RRsetの検出、失敗時のエラーのみを出力します。<br />&nbsp;1:&nbsp;問い合わせが行われたネームサーバを表示します。<br />&nbsp;2:&nbsp;チェックされた情報を表示します。<br />&nbsp;3:&nbsp;中間の結果（権威およびDNSKEY RRset）を表示します。<br />&nbsp;4:&nbsp;返された回答パケットを出力します。</p>
<p><strong>-r</strong> <em>file</em></p>
<p>ルート ヒント ファイルとしてfileを使います。デフォルトは/etc/named.rootです。http://www.internic.net/zones/named.rootから取得できます。</p>
<p><strong>-s</strong> 鍵を標準出力に出力せず、ファイルに保存します。</p>
<p>ファイル名はK&lt;file&gt;.+&lt;alg&gt;.+&lt;keytag&gt;.keyの形式です。</p>
<h2>著者</h2>
<p>NLnet LabsのJelte Jansenにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2006 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
