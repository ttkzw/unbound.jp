---
title: ldns-walk(1)
---
<h1>ldns-walk</h1>
<p>Section: User Commands (1)<br />Updated: 21 Nov 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-walk - DNSSEC署名済みゾーンの内容を取得する</p>
<h2>書式</h2>
<p><strong>ldns-walk</strong> [ <em>OPTION</em> ] <em>ZONE</em></p>
<h2>説明</h2>
<p><strong>ldns-walk</strong>はDNSSEC署名済みゾーンの内容を取得するために使われます。（NSECレコードの鎖をたどる）NSECウォーキングと各NSECの次の不在所有者名を推測することにより行います。</p>
<p>キャッシュ フォワーダーを通して使われると、ワイルドカード レコードで動かなくなるかもしれません。この問題は（@引数で）直接に権威ネームサーバに問い合わせることにより避けることができます。</p>
<p>もちろん、使われるネームサーバはDNSSECに対応しているものでなければなりません。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-f</strong></dt>
<dd>完全なゾーン ウォークを行います。デフォルトでは、ldns-walkは名前とその名前で存在するタイプのみを表示します。このオプションが与えられたら、すべてのリソース レコードが出力されます。</dd>
<dt><strong>-s</strong> <em>name</em></dt>
<dd>この所有者名でウォークを開始します。大きいゾーンでウォークを続けるときに役に立ちます。</dd>
<dt><strong>@</strong> <em>nameserver</em></dt>
<dd>このネームサーバにクエリーを送ります。</dd>
</dl>
<h2>バグ</h2>
<p>フルゾーン ウォーク機能はまだ完全ではありません。委譲レコードを必ずしも正しくは出力できません。</p>
<h2>著者</h2>
<p>ldnsの使い方の例としてJelte Jansenにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
