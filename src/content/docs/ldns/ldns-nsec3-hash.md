---
title: ldns-nsec3-hash(1)
---
<h1>ldns-nsec3-hash</h1>
<p>Section: User Commands (1)<br />Updated: 10 Dec 2008<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-nsec3-hash - ドメイン名に対するNSEC3ハッシュを出力する</p>
<h2>書式</h2>
<p><strong>ldns-nsec3-hash</strong> <em>&lt;domain_name&gt;</em></p>
<h2>説明</h2>
<p><strong>ldns-nsec3-hash</strong>は指定したドメイン名に対するNSEC3ハッシュを出力するために使われます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-a</strong> <em>number</em></dt>
<dd>ハッシュ計算に指定したアルゴリズム番号を使います。デフォルトは1（SHA-1）です。</dd>
<dt><strong>-s</strong> <em>salt</em></dt>
<dd>ハッシュ計算に指定したソルトを使います。ソルトの値は16進数形式にします。</dd>
<dt><strong>-t</strong> <em>count</em></dt>
<dd>ハッシュ計算に指定した回数のイテレーションを行います。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2008 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
