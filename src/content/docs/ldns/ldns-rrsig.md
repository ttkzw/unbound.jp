---
title: ldns-rrsig(1)
---
<h1>ldns-rrsig</h1>
<p>Section: User Commands (1)<br />Updated: 27 Apr 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-rrsig - 人間が読みやすい形式で有効期限の開始日と終了日を出力する</p>
<h2>書式</h2>
<p><strong>ldns-rrsig</strong> <em>domain</em> [ <em>type</em> ]</p>
<h2>説明</h2>
<p><strong>ldns-rrsig</strong>はRRSIGの有効期限の開始日と終了日を出力するために使われます。最初の引数はドメイン名です。<strong>ldns-rrsig</strong>はRRSIGの一覧を得るためにそのドメイン名の権威サーバを問い合わせます。それから、SOAレコードに対するRRSIGの有効期限の開始日と終了日を出力します。</p>
<p>2番目の引数<strong>type</strong>が与えられたら、そのタイプに対するRRSIGが示されます。</p>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
