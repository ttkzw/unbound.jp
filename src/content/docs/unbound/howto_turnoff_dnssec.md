---
title: Unbound - DNSSECを無効にする方法
sidebar:
    order: 5
---
<author>
  By W.C.A. Wijngaards, NLnet Labs, June 2010.
</author>

<p>
DNSSECが設定されているときに問題を見つけ、その問題が検証と関係があると慎重に評価し、攻撃中ではないと評価しているのであれば、DNSSECを無効にするために以下のステップに従ってもよいでしょう。警告しますが、気軽にDNSSECを無効にしないでくださし。攻撃の被害を受けやすくなります。
</p>

<p>
管理権限が必要で、設定ファイルを再読み込みするためにサーバを再起動させる必要があります。
</p>

<h2>1. 寛容なモード</h2>
<p>
実際にはDNSSECをオフにはしませんが、リゾルバがクライアントに偽の回答を知らせないようにするのをやめます。この解決策は検証の失敗のために遅くなるかもしれませんが、処理を続けることができます。unbound.confファイルに次の記述を追加します:
</p>

<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre>server:
        val-permissive-mode: yes
</pre>
</td></tr></tbody></table>

<h2>2. トラストアンカーを削除する</h2>
<p>
unbound.confファイルからトラストアンカーの記述を削除すれば、DNSSECは記述を削除した対象のドメインには使われなくなります。
</p>

<h2>3. validatorモジュールを無効にする</h2>
<p>
DLVも含め他のドメインの検証も無効にします。unbound.confファイルの記述は次のようになります:
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre>server:
        module-config: "iterator"
</pre>
</td></tr></tbody></table>

<h2>4.  壊れている信頼の連鎖を止める</h2>
<p>
壊れた信頼の連鎖に対処するために、適切なDSやDNSKEYレコードが発行されるまで一時的にunbound.confファイルに次のような記述を加えます:
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre>server:
        domain-insecure: "example"
</pre>
</td></tr></tbody></table>


<p>この文章は<a href="http://www.unbound.net/documentation/howto_turnoff_dnssec.html">Unbound: Howto Turn Off DNSSEC (www.unbound.net)</a>の翻訳です。[翻訳: 滝澤 隆史]</p>
