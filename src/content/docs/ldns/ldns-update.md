---
title: ldns-update(1)
---
<h1>ldns-update</h1>
<p>Section: User Commands (1)<br />Updated: 30 May 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-update - 動的更新パケットを送る</p>
<h2>書式</h2>
<p><strong>ldns-update</strong> [ <em>zone</em> ] <em>ip</em> [ <em>tsig_name</em> <em>tsig_als</em> <em>tsig_hmac</em> ]</p>
<h2>説明</h2>
<p><strong>ldns-update</strong>は動的更新パケットを送信するために使われます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>zone</strong></dt>
<dd>ゾーンファイルのSOAレコードから読もうとする代わりにこのゾーンを使います。</dd>
<dt><strong>ip</strong></dt>
<dd>このIPアドレスに更新を送信します。</dd>
<dt><strong>tsig_name tsig_alg tsig_hmac</strong></dt>
<dd>認証にTSIG (rfc2845) を使います。</dd>
</dl>
<h2>例</h2>
<p>ldns-update my.example.org 1.2.3.4</p>
<h2>著者</h2>
<p>NLnet Labsによるldnsライブラリへの追加として、Jakob SchlyterとHA\kan Olssonにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
