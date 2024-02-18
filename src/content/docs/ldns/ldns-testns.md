---
title: ldns-testns(1)
---
<h1>ldns-testns</h1>
<p>Section: User Commands (1)<br />Updated: 14 Dec 2006<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-testns - 簡易的な偽ネームサーバ ツール</p>
<h2>SYNOPSYS</h2>
<p><strong>ldns-testns</strong> [ <em>OPTION</em> ] <em>datafile</em></p>
<h2>説明</h2>
<p><strong>ldns-testns</strong>は試験用のDNSクエリーに回答を提供するために使われます。回答は事前に作られており、試験の必要性に合わせることができます。回答は失敗あるいは解析不能になります。</p>
<p>このプログラムはデバッギングが目的です。特に長い設定ファイルでは効率はよくないです。しかし、どんなクエリーに対するどんな回答も与えることができます。これは開発者がクエリーに対する事前に用意したスクリプトで返答するのに役に立ちます。</p>
<p>デフォルトではIPv4のUDPとTCPで待ち受けます。返すヘッダ フラグを持つRRでパケットのRRを指定することができます。</p>
<p>ldns-testnsは製品としての利用を意味しません。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-r</strong></dt>
<dd>ランダム ポートで待ち受けます。ポート番号は標準出力に表示されます。</dd>
<dt><strong>-p</strong> <em>port</em></dt>
<dd>指定したポートで待ち受けます。</dd>
<dt><strong>-f</strong> <em>num</em></dt>
<dd>同じポートと同じデータファイルを提供する追加のインスタンスをこの数のぶんだけフォークします。これらは終了しません。'forked pid: &lt;num&gt;'と出力されるので、自分でそれらをkillする必要があります。</dd>
<dt><strong>-v</strong></dt>
<dd>より多くのデバッグ情報を出力します。饒舌さのレベルを増やすにはこのオプションを複数回与えます。</dd>
<dt><strong>-6</strong></dt>
<dd>IPv4の代わりにIPv6アドレスにバインドします。-pオプションと一緒に使います。</dd>
<dt><strong>datafile</strong></dt>
<dd>このデータファイルは起動時に読み込まれます。クエリーとそれらのクエリーの回答で送られるパケットを含みます。データファイルの形式は以下で説明します。</dd>
</dl>
<h2>データファイルの形式</h2>
<p>データファイルの形式はコメントを与えるために';'を持ちます。エントリーの数は最初から最後まで処理されます。最初に一致したエントリーはクエリーに回答するために使われます。これは行ベースの形式です。DNSリソース レコードはゾーンファイル形式で入力されます。</p>
<p>$ORIGINと$TTLディレクティブを使うことができます。複数行に拡張するためのゾーンファイルの記法'('と')'は許可されていません。</p>
<p>$ORIGIN origin $TTL default_ttl</p>
<p>ENTRY_BEGIN</p>
<p>; first give MATCH lines, that say what queries are matched ; by this entry. ; 'opcode' makes the query match the opcode from the reply ; if you leave it out, any opcode matches this entry. ; 'qtype' makes the query match the qtype from the reply ; 'qname' makes the query match the qname from the reply ; 'serial=1023' makes the query match if ixfr serial is 1023.</p>
<p>MATCH [opcode] [qtype] [qname] [serial=&lt;value&gt;] MATCH [UDP|TCP] MATCH ...</p>
<p>; Then the REPLY header is specified.</p>
<p>REPLY opcode, rcode or flags.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(opcode)&nbsp;&nbsp;QUERY&nbsp;IQUERY&nbsp;STATUS&nbsp;NOTIFY&nbsp;UPDATE<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(rcode)&nbsp;&nbsp;&nbsp;NOERROR&nbsp;FORMERR&nbsp;SERVFAIL&nbsp;NXDOMAIN&nbsp;NOTIMPL&nbsp;YXDOMAIN<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YXRRSET&nbsp;NXRRSET&nbsp;NOTAUTH&nbsp;NOTZONE<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(flags)&nbsp;&nbsp;&nbsp;QR&nbsp;AA&nbsp;TC&nbsp;RD&nbsp;CD&nbsp;RA&nbsp;AD</p>
<p>REPLY ...</p>
<p>; any additional actions to do.</p>
<p>ADJUST copy_id ; 'copy_id' copies the ID from the query to the answer.</p>
<p>; 'sleep=10' sleeps for 10 seconds before giving the answer (TCP is open)</p>
<p>ADJUST [sleep=&lt;num&gt;] ; sleep before giving any reply ADJUST [packet_sleep=&lt;num&gt;] ; sleep before this packet in sequence</p>
<p>SECTION QUESTION &lt;RRs, one per line&gt; ; the RRcount is determined automatically.</p>
<p>SECTION ANSWER &lt;RRs, one per line&gt;</p>
<p>SECTION AUTHORITY &lt;RRs, one per line&gt;</p>
<p>SECTION ADDITIONAL &lt;RRs, one per line&gt;</p>
<p>EXTRA_PACKET ; follow with SECTION, REPLY for more packets. HEX_ANSWER_BEGIN ; follow with hex data<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;this&nbsp;replaces&nbsp;any&nbsp;answer&nbsp;packet&nbsp;constructed<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;with&nbsp;the&nbsp;SECTION&nbsp;keywords&nbsp;(only&nbsp;SECTION&nbsp;QUERY<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;is&nbsp;used&nbsp;to&nbsp;match&nbsp;queries).&nbsp;If&nbsp;the&nbsp;data&nbsp;cannot<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;be&nbsp;parsed,&nbsp;ADJUST&nbsp;rules&nbsp;for&nbsp;the&nbsp;answer&nbsp;packet<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;are&nbsp;ignored</p>
<p>HEX_ANSWER_END</p>
<p>ENTRY_END</p>
<h2>著者</h2>
<p>Written by the ldns team as an example for ldns usage, and for testing purposes.</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2006-2008 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
