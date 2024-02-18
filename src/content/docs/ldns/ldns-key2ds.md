---
title: ldns-key2ds(1)
---
<h1>ldns-key2ds</h1>
<p>Section: User Commands (1)<br />Updated: 30 May 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-key2ds - DNSKEY RRをDS RRに変換する</p>
<h2>書式</h2>
<p><strong>ldns-key2ds</strong> <em>file</em></p>
<h2>説明</h2>
<p><strong>ldns-key2ds</strong>は公開DNSKEY RRをDS RRに変換するために使われます。実行時に、DNSKEY RRを記述してある<em>ファイル</em>を読み込み、DS RRを記述した.dsファイルを生成します。</p>
<p>このファイルのベース名（K&lt;name&gt;+&lt;alg&gt;+&lt;id&gt;）を出力します。</p>
<p>デフォルトでは、RSASHA1に対するSHA1のように、鍵アルゴリズムに似たアルゴリズムを採用します。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-n</strong></dt>
<dd>ファイルの代わりに標準出力に結果のDS RRを書き出します。</dd>
<dt><strong>-1</strong></dt>
<dd>ハッシュ関数としてSHA1を使います。</dd>
<dt><strong>-2</strong></dt>
<dd>ハッシュ関数としてSHA256を使います。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
