---
title: ldns-zcat(1)
---
<h1>ldns-zcat</h1>
<p>Section: User Commands (1)<br />Updated: 15 Dec 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-zcat - 分割されたゾーンファイルを結合する</p>
<h2>書式</h2>
<p><strong>ldns-zcat</strong> <em>zonefiles</em></p>
<h2>説明</h2>
<p><strong>ldns-zcat</strong>は分割されたゾーンファイルの束を読み込み、新しい大きなゾーンファイルを生成します。最初のパートのSOAレコードは生成されるゾーンのSOAレコードとして使われます。</p>
<p>結果のゾーンファイルは標準出力に出力されます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-o ORIGIN</strong></dt>
<dd>ゾーン内に読み込まれるときにORIGINを使います。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005, 2006 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
