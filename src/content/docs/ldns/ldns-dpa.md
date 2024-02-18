---
title: ldns-dpa(1)
---
<h1>ldns-dpa</h1>
<p>Section: User Commands (1)<br />Updated: 1 Nov 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-dpa - DNSパケット アナライザー。IPトレースファイル内のDNSパケットを解析する。</p>
<h2>書式</h2>
<p><strong>ldns-dpa</strong> [ <em>OPTION</em> ] <em>TRACEFILE</em></p>
<h2>説明</h2>
<p><strong>ldns-dpa</strong>はトレースファイル内のDNSパケットを解析するために使われます。3つの主要なオプションがあります。countとfilterとcount uniques（例えば、すべての異なる出現を数える）です。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-c</strong> <em>expressionlist</em></dt>
<dd>一致した式の出現を数えます。</dd>
<dt><strong>-f</strong> <em>expression</em></dt>
<dd>フィルタ: 式に一致するパケットのみを処理します。</dd>
<dt><strong>-h</strong></dt>
<dd>使い方を表示します。</dd>
<dt><strong>-p</strong></dt>
<dd>正しいDNSパケットの総数と（-fフィルタに一致した総数に対する）-uと-cの値のパーセンテージを表示します。フィルタが指定されなければ、パーセンテージはすべての正しいDNSパケットに対するものになります。</dd>
<dt><strong>-of</strong> <em>file</em></dt>
<dd>pcapデータとして、ファイルに対して-fフラグに一致するすべてのパケットを書き出します。</dd>
<dt><strong>-ofh</strong> <em>file</em></dt>
<dd>drillで読み込める16進数形式で、ファイルに対して-fフラグに一致するすべてのパケットを書き出します。</dd>
<dt><strong>-s</strong></dt>
<dd>一致する名前を表示します。</dd>
<dt><strong>-s</strong> <em>matchname</em></dt>
<dd>一致する演算子と名前の値を表示します。</dd>
<dt><strong>-sf</strong></dt>
<dd>-fフィルタに一致する（説明形式で）パケットを評価します。-fが指定されなければ、すべての正しいDNSパケットを評価します。</dd>
<dt><strong>-u</strong> <em>matchnamelist</em></dt>
<dd>matchnameの値ごとの出現を数えます。例えば、すべてのパケットサイズを数えます。<a href="../ldns-dpa/">ldns-dpa</a>(1)の例を参照してください。</dd>
<dt><strong>-ua</strong></dt>
<dd>-uのmatchnameごとに、すべての一致した平均の値を表示します。整数値を持たないmatch typeの動作は定義されていません。</dd>
<dt><strong>-uac</strong></dt>
<dd>-uのmatchnameごとに、この値が出現した平均の回数を表示します。</dd>
<dt><strong>-um</strong> <em>number</em></dt>
<dd>&lt;number&gt;回以上出現した値の-uから結果を表示します。</dd>
<dt><strong>-v</strong> <em>level</em></dt>
<dd>饒舌さのレベルを設定します。1から5までで、5が最高になります。主にデバッグのために使われます。</dd>
<dt><strong>-notip</strong> <em>file</em></dt>
<dd>pcapデータとして、ファイルに対してIPパケットとして識別されないパケットを書き出します。</dd>
<dt><strong>-baddns</strong> <em>file</em></dt>
<dd>pcapデータとして、ファイルに対して壊れすぎて解析できないパケットを書き出します。</dd>
<dt><strong>-version</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
</dl>
<h2>リストと一致</h2>
<p>&lt;matchnamelist&gt;は一致する名前のカンマ区切りのリストです（一致する名前を表示するためには-sを使います）。&lt;expressionlist&gt;は式のカンマ区切りのリストです。</p>
<p>式は次の形式になります: &lt;expr&gt;: (&lt;expr&gt;)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;expr&gt;&nbsp;|&nbsp;&lt;expr&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;expr&gt;&nbsp;&amp;&nbsp;&lt;expr&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;match&gt;</p>
<p>&lt;match&gt;: &lt;matchname&gt; &lt;operator&gt; &lt;value&gt;</p>
<p>&lt;operator&gt;: <tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>=<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>equal to &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>!=<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>not equal to &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>&gt;<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>greater than &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>&lt;<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>lesser than &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>&gt;=<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>greater than or equal to &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>&lt;=<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>lesser than or equal to &lt;value&gt;<br /><tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>~=<tt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</tt>contains &lt;value&gt;<br /></p>
<p>一致する名前と演算子と値のために-sオプションを参照してください。</p>
<h2>例</h2>
<dl compact="compact">
<dt>ldns-dpa -u packetsize -p test.tr</dt>
<dd>Count all different packetsizes in test.tr and show the precentages.</dd>
<dt>ldns-dpa -f "edns=1&amp;qr=0" -of edns.tr test.tr</dt>
<dd>Filter out all edns enable queries in test.tr and put them in edns.tr</dd>
<dt>ldns-dpa -f edns=1 -c tc=1 -u rcode test.tr</dt>
<dd>For all edns packets, count the number of truncated packets and all their rcodes in test.tr.</dd>
<dt>ldns-dpa -c tc=1,qr=0,qr=1,opcode=QUERY test.tr</dt>
<dd>For all packets, count the number of truncated packets, the number of packets with qr=0, the number of packets with qr=1 and the number of queries in test.tr.</dd>
<dt>ldns-dpa -u packetsize -ua test.tr</dt>
<dd>Show all packet sizes and the average packet size per packet.</dd>
<dt>ldns-dpa -u srcaddress -uac test.tr</dt>
<dd>Show all packet source addresses and the average number of packets sent from this address.</dd>
<dt>sudo tcpdump -i eth0 -s 0 -U -w - port 53 | ldns-dpa -f qr=0 -sf</dt>
<dd>Print all query packets seen on the specified interface.</dd>
</dl>
<h2>著者</h2>
<p>NLnet LabsのJelte Jansenにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;jelte@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
