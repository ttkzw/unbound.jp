---
title: ldns-signzone(1)
---
<h1>ldns-signzone</h1>
<p>Section: User Commands (1)<br />Updated: 30 May 2005<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-signzone - DNSSECデータでゾーンファイルを署名する</p>
<h2>書式</h2>
<p><strong>ldns-signzone</strong> [ <em>OPTIONS</em> ] <em>ZONEFILE</em> <em>KEY</em> [KEY [KEY] ... ]</p>
<h2>説明</h2>
<p><strong>ldns-signzone</strong>はDNSSEC署名済みゾーンを生成するために使われます。実行時に、RFC 4033とRFC 4034とRFC 4035で示したように、RRSIGとNSECリソース レコードを含むゾーンファイルを生成します。</p>
<p>鍵ファイルは（.privateなしの）ベース名で指定される必要があります。.privateファイル内の鍵として記述されているDNSKEYがゾーンに存在しなければ、ファイル&lt;ベース名&gt;.keyから読み込まれます。そのファイルが存在しなければ、DNSKEYの値は秘密鍵から生成されます。</p>
<p>複数の鍵を指定できます。鍵署名鍵（KSK）はゾーンにすでに存在するか、.keyファイルで指定されるか、KSKビット セットを持つかするときに使われます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-d</strong></dt>
<dd>普通は、ゾーンを署名するために使われる鍵のDNSKEY RRがゾーン ファイルに見つからなければ、.keyから読まれたり、秘密鍵から（その順番で）取得されたりします。このオプションはその機能をオフにして、署名のみがゾーンに追加されるようにします。</dd>
<dt><strong>-e</strong> <em>date</em></dt>
<dd>署名の有効期限の終了日をこの日に設定します。その形式はYYYYMMDD[hhmmss]あるいはタイムスタンプになります。</dd>
<dt><strong>-f</strong> <em>file</em></dt>
<dd>このファイルに署名済みゾーンを保存します。デフォルトは「オリジナルファイル.signed」です。</dd>
<dt><strong>-i</strong> <em>date</em></dt>
<dd>署名の有効期限の開始日をこの日に設定します。その形式はYYYYMMDD[hhmmss]あるいはタイムスタンプになります。</dd>
<dt><strong>-l</strong></dt>
<dd>古いDNSSEC RRSIGとNSECリソースレコードをそのままに残します。デフォルトではゾーンから削除されます。</dd>
<dt><strong>-o</strong> <em>origin</em></dt>
<dd>ゾーンのオリジナルとしてこれを使います。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
<dt><strong>-A</strong></dt>
<dd>すべての鍵でDNSSECレコードを署名します。デフォルトでは最小限の鍵で署名されます。DNSKEYクエリーの応答サイズを小さく保つためです。渡されるSEP鍵のみが使われます。SEP鍵がなければ、DNSKEYリソース レコードは非SEP鍵で署名されます。このオプションはデフォルトをオフにし、すべての鍵がDNSKEYリソースレコードを署名するために使われます。</dd>
<dt><strong>-E</strong> <em>name</em></dt>
<dd>署名には指定した名前のEVP暗号エンジンを使います。これはさらにオプションを持ちます。詳しくはエンジン オプションを見てください。</dd>
<dt><strong>-k</strong> <em>id,int</em></dt>
<dd>ゾーン署名鍵（ZSK）として、指定したidとアルゴリズム番号を持つ鍵を使います。このオプションはOpenSSLエンジンを使うときに使われます。詳しくはエンジン オプションを見てください。</dd>
<dt><strong>-K</strong> <em>id,int</em></dt>
<dd>
<p>鍵署名鍵（KSK）として、指定したidとアルゴリズム番号を持つ鍵を使います。このオプションはOpenSSLエンジンを使うときに使われます。詳しくはエンジン オプションを見てください。</p>
</dd>
<dt><strong>-n</strong></dt>
<dd>NSECの代わりにNSEC3を使います。</dd>
<dt>NSEC3を使うのであれば、次の追加のオプションを指定できます。</dt>
<dt><strong>-a</strong> <em>algorithm</em></dt>
<dd>指定したアルゴリズムはNSEC3のハッシュ化した所有者名を生成するために使われます。</dd>
<dt><strong>-p</strong></dt>
<dd>オプトアウト。ゾーン内のすべてのNSEC3レコードはオプトアウト フラグ セットを持ちます。署名後に、署名済みゾーンに安全でない委譲を加えます。</dd>
<dt><strong>-s</strong> <em>string</em></dt>
<dd>ソルト。</dd>
<dt><strong>-t</strong> <em>number</em></dt>
<dd>ハッシュ計算のイテレーションの回数。</dd>
</dl>
<h2>エンジン オプション</h2>
<p>OpenSSL設定ファイルを設定することにより、サポートしていれば、利用可能なエンジンを変更することができます。これは環境変数OPENSSL_CONFを通して行われます。存在しないエンジン名で-Eオプションを使ったら、ldns-signzoneは設定でサポートされているエンジンの一覧を表示します。</p>
<p>鍵オプション（-kと-K）は次のように働きます。鍵IDとDNSSECアルゴリズム番号（例えば、RSASHA1では5）を指定します。鍵idは次のどれかになります:</p>
<p><br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;id&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;slot&gt;:&lt;id&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;id_&lt;id&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;slot_&lt;slot&gt;-id_&lt;id&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;label_&lt;label&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;slot_&lt;slot&gt;-label_&lt;label&gt;</p>
<p>ここで、'&lt;id&gt;'は16進数記法のPKCS #11鍵の識別子で、'&lt;label&gt;'はPKCS #11の人が読みやすい形式のラベルで、'&lt;slot&gt;'はトークンが存在するスロット番号です。</p>
<p>まだ、存在しなければ、DNSKEYリソース レコードは鍵データから生成され、ゾーンに追加されます。</p>
<h2>例</h2>
<dl compact="compact">
<dt>ldns-signzone nlnetlabs.nl Knlnetlabs.nl.+005+12273</dt>
<dd>ファイル'Knlnetlabs.nl.+005+12273.private'内の鍵を持つファイル'nlnetlabs.nl'内のゾーンを署名します。DNSKEYがゾーンに存在しなければ、ファイル'Knlnetlabs.nl.+005+12273.key'内の鍵を使います。それも存在しなければ、'Knlnetlabs.nl.+005+12273.private'からデフォルト値を持つものを生成します。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005-2008 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
