---
title: ldns-zsplit(1)
---
<h1>ldns-zsplit</h1>
<p>Section: User Commands (1)<br />Updated: 15 Dec 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-zsplit - ゾーンファイルを分割する</p>
<h2>書式</h2>
<p><strong>ldns-zsplit</strong> [ <em>OPTIONS</em> ] <em>zonefile</em></p>
<h2>説明</h2>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-n NUMBER</strong></dt>
<dd>与えた番号のRRの後に分割します。<strong>ldns-zsplit</strong>はRRの途中で分割はしません。</dd>
</dl>
<p>それぞれの部分は数字の接尾語で保存されます。接尾語は.000で始まります。そのため、最大の接尾語は.999になります。</p>
<dl compact="compact">
<dt><strong>-o ORIGIN</strong></dt>
<dd>ゾーンファイルを読み込むとき、起源としてORIGINを使います。</dd>
<dt><strong>-z</strong></dt>
<dd>分割する前にゾーンをソートします。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005, 2006 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
