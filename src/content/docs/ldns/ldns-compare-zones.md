---
title: ldns-compare-zones(1)
---
<h1>ldns-compare-zones</h1>
<p>Section: User Commands (1)<br />Updated: 17 Oct 2007<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-compare-zones - 2つのゾーンファイルを読み込んで比較し、違いを出力する</p>
<h2>書式</h2>
<p><strong>ldns-compare-zones</strong> <em>[-c]</em> <em>[-i]</em> <em>[-d]</em> <em>[-z]</em> <em>[-s]</em> <em>ZONEFILE1</em> <em>ZONEFILE2</em></p>
<h2>説明</h2>
<p><strong>ldns-compare-zones</strong>は2つのDNSゾーンファイルを読み、違いを出力します。</p>
<pre>
出力形式は次の通りです:
        +NUM_INS        -NUM_DEL        ~NUM_CHG

</pre>
<p>主な比較は所有者名に基づいています。所有者名がゾーンファイル1に存在し、ゾーンファイル2に存在しなければ、この所有者名のリソースレコードは削除されたと考えられ、NUM_DELとして数えられます。所有者名がゾーンファイル2に存在し、ゾーンファイル1に存在しなければ、この所有者名のリソースレコードは挿入されたと考えられ、NUM_INSとして数えられます。オーナ名が両方に存在し、そのレコードの数や内容に違いがあれば、変更されたと考えられ、NUM_CHGとして数えられます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-c</strong></dt>
<dd>所有者名が両方のゾーンファイルに存在するリソースレコードを出力し、異なるリソースレコードを出力します。(a.k.a. changed)</dd>
<dt><strong>-i</strong></dt>
<dd>所有者名がゾーンファイル2にのみ存在するリソースレコードを出力します。 (a.k.a. inserted)</dd>
<dt><strong>-d</strong></dt>
<dd>所有者名がゾーンファイル1のみに存在するリソースレコードを出力します。 (a.k.a. deleted)</dd>
<dt><strong>-a</strong></dt>
<dd>全ての変更を出力します。このオプションを指定することは、-c -i -dを指定するのと同じです。</dd>
<dt><strong>-z</strong></dt>
<dd>ゾーンのソートを行いません。このオプションは推奨されません。変更の状態によっては、レコードが誤って変更されたと判断されることを引き起こします。</dd>
<dt><strong>-s</strong></dt>
<dd>SOAレコードを比較から除外しません。SOAレコードは新しいシリアル番号のために変更されたと示されます。（他のゾーンの頂点の要素が）変更されているかを知ることに興味があるでしょうから、デフォルトではオフです。</dd>
<dt><strong>-h</strong></dt>
<dd>使い方を表示して、終了します。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
</dl>
<h2>著者</h2>
<p>CZ.NIC, z.s.p.o.のためにOndA?ej SurA? &lt;ondrej@sury.org&gt;により書かれました。(czech domain registry)</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ondrej@sury.org&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 CZ.NIC, z.s.p.o.. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />

