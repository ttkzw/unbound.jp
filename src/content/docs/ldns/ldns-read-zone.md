---
title: ldns-read-zone(1)
---
<h1>ldns-read-zone</h1>
<p>Section: User Commands (1)<br />Updated: 30 May 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-read-zone - ゾーンファイルを読み込んで、出力する</p>
<h2>書式</h2>
<p><strong>ldns-read-zone</strong> <em>ZONEFILE</em></p>
<h2>説明</h2>
<p><strong>ldns-read-zone</strong>はDNSゾーンファイルを読み込んで、出力します。その出力は1行につき1つのリソースレコードになり、たくさん出力する構造ではありません。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-c</strong></dt>
<dd>出力する前にゾーンのすべてのリソースレコードを正規化します。</dd>
<dt><strong>-d</strong></dt>
<dd>ゾーンからDNSSECデータのみを出力します。このオプションはタイプがNSECやNSEC3やRRSIGやDNSKEYでないレコードを省きます。DSレコードは出力されません。</dd>
<dt><strong>-h</strong></dt>
<dd>使い方を表示して、終了します。</dd>
<dt><strong>-n</strong></dt>
<dd>SOAレコードを出力しません。</dd>
<dt><strong>-s</strong></dt>
<dd>ゾーンからDNSSECデータを取り去ります。このオプションはタイプがNSECやNSEC3やRRSIGやDNSKEYであるリソースレコードを省きます。DSレコードは出力されます。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
<dt><strong>-z</strong></dt>
<dd>出力前にゾーンをソートします。これは-cを意味します。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
