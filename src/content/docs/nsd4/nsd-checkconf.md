---
title: nsd-checkconf(8)
sidebar:
    order: 4
---
# nsd-checkconf

Section: nsd 4.0.0 (8)<br />
Updated: Oct 29, 2013<br />

<hr />

## 名前

<p><strong>nsd-checkconf</strong> - NSD設定ファイルチェッカー</p>

## 書式

<p><strong>nsd-checkconf</strong> [<strong>-v</strong>] [<strong>-h</strong>] [<strong>-o</strong> <em>option</em>] [<strong>-z</strong> <em>zonename</em>] [<strong>-p</strong> <em>pattern</em>] [<strong>-s</strong> <em>keyname</em>] <em>configfile</em></p>
<h2>説明</h2>
<p><strong>nsd-checkconf</strong>は設定ファイルを読み込みます。標準エラーに解析エラーを出力し、内容について追加のチェックを行います。設定ファイルの形式は<a href="../nsd.conf/">nsd.conf</a>(5)に記述されています。このプログラムのユーティリティは<a href="../nsd/">nsd</a>(8)で設定ファイルを使う前にエラーをチェックするために使われます。このプログラムは-oと-zオプションを使って、シェルスクリプトがnsdの設定ファイルにアクセスするためにも使うことができます。</p>

## オプション

<dl compact="compact">
<dt><strong>-v</strong></dt>
<dd>読み込み後に、設定ファイルの形式で標準出力にオプションを出力します。このオプションなしでは、成功あるいは解析エラーのみが報告されます。</dd>
<dt><strong>-h</strong></dt>
<dd>使い方のヘルプを出力し、終了します。</dd>
<dt><strong>-o</strong> <em>option</em></dt>
<dd>設定ファイルからこのオプションのみを返します。このオプションは<strong>-z</strong>や<strong>-p</strong>オプションと一緒に、または、それらのオプションなしにserver: セクションを問い合わせるために使うこともできます。特別な値 <em>zones</em> は設定されたゾーンの一覧を出力します。特別な値<em>patterns</em>は設定されたパターンの一覧を出力します。
<dl compact="compact">
<dd>このオプションはシェルから設定ファイルを解析するために、主に<strong>nsdc</strong>によって使われます。<strong>-z</strong>オプションが与えられ、<strong>-o</strong>オプションが与えられなかったら、何も出力しません。</dd>
</dl>
</dd>
<dt><strong>-s</strong> <em>keyname</em></dt>
<dd>設定ファイルのこの鍵に対して設定された秘密鍵（base64形式）を出力します。シェルスクリプトが設定ファイルを解析するのに役立てるために使われます。</dd>
<dt><strong>-p</strong> <em>pattern</em></dt>
<dd>ここで指定したパターン名に対する<strong>-o</strong>オプションで指定されたオプションを返します。</dd>
<dt><strong>-z</strong> <em>zonename</em></dt>
<dd>ここで指定したゾーン名に対する<strong>-o</strong>オプションで指定されたオプションを返します。
<dl compact="compact">
<dd>このオプションを与えなければ、設定ファイルのserverセクションが使われます。</dd>
</dl>
<dl compact="compact">
<dd>-oと-sと-zオプションは標準出力に設定ファイルのオプションを出力します。</dd>
</dl>
</dd>
</dl>

## ファイル

<dl compact="compact">
<dt>/etc/nsd/nsd.conf</dt>
<dd>デフォルトの<strong>NSD</strong>の設定ファイル</dd>
</dl>

## 関連項目

<p><em><a href="../nsd/">nsd</a></em>(8), <em><a href="../nsd.conf/">nsd.conf</a></em>(5), <em><a href="../nsd-control/">nsd-control</a></em>(8)</p>

## 著者

<p><strong>NSD</strong>はNLnet LabsとRIPE NCCの共同チームにより作られました。詳細は配布ファイルに含まれているファイルCREDITSを見てください。</p>
<hr />
