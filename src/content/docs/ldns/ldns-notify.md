---
title: ldns-notify(1)
---
<h1>ldns-notify</h1>
<p>Section: User Commands (1)<br />Updated: 9 Jan 2007<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-notify - 更新が利用できることをDNSサーバに通知する。</p>
<h2>書式</h2>
<p><strong>ldns-notify</strong> [options] -z zone <em>servers</em></p>
<h2>説明</h2>
<p><strong>ldns-notify</strong>はDNSサーバにNOTIFYメッセージを送ります。これはマスタ サーバで更新されたゾーンが利用できることをDNSサーバに伝えます。TSIGの署名を行い、更新されたゾーンのSOAシリアル番号を加えます。サーバがすでにそのシリアル番号を持っていれば、そのメッセージを無視します。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-z zone</strong></dt>
<dd>更新されたゾーン。</dd>
<dt><strong>-h</strong></dt>
<dd>使い方を表示して、終了します。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
<dt><strong>-s serial</strong></dt>
<dd>更新されたゾーンのシリアル番号を示すSOAレコードを追加します。</dd>
<dt><strong>-p port</strong></dt>
<dd>UDPパケットの宛先ポートとしてポート番号を指定します。デフォルトはDNSポート53です。</dd>
<dt><strong>-y key:data</strong></dt>
<dd>NOTIFYを署名するために与えられたTSIG鍵とbase64データを使います。hmac-md5アルゴリズムを使います。</dd>
<dt><strong>-d</strong></dt>
<dd>饒舌なデバッグ情報を出力します。送信したクエリーと受信したクエリーです。</dd>
<dt><strong>-r num</strong></dt>
<dd>通知がUDPパケットの送信の試みをあきらめる前に試みる最大回数を指定します。</dd>
</dl>
<h2>終了コード</h2>
<p>すべてのサーバが通知メッセージへの承認を返信すれば、終了コード0でプログラムは終了します。そうでなければ、失敗の終了コードで終了します。</p>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
