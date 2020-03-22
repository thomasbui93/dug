const formatPoem = require('../../src/services/poem/format')

test('It formats poem html to nicer format', () => {
  const html = '<h4><strong class="HanChinese transcriptable" data-han-lang="hv" lang="zh-Hant">&#x79CB;&#x601D;</strong> <i class="fa fa-language transcript" data-toggle="tooltip" title="&#x110;&#x1ED5;i ch&#x1EEF; ph&#x1ED3;n/gi&#x1EA3;n th&#x1EC3;" onclick="Chinese2Simplified(this)"></i> <i class="fa fa-random alternative" data-toggle="tooltip" title="Xen k&#x1EBD; nguy&#xEA;n t&#xE1;c, phi&#xEA;n &#xE2;m" onclick="SwitchPoemView(this, true)"></i></h4>\n\t\t\t\t\t<p class="HanChinese transcriptable" data-han-lang="hv" lang="zh-Hant">&#x71D5;&#x652F;&#x9EC3;&#x8449;&#x843D;&#xFF0C;<br>&#x59BE;&#x671B;&#x81EA;&#x767B;&#x81FA;&#x3002;<br>&#x6D77;&#x4E0A;&#x78A7;&#x96F2;&#x65B7;&#xFF0C;<br>&#x55AE;&#x4E8E;&#x79CB;&#x8272;&#x4F86;&#x3002;<br>&#x80E1;&#x5175;&#x6C99;&#x585E;&#x5408;&#xFF0C;<br>&#x6F22;&#x4F7F;&#x7389;&#x95DC;&#x56DE;&#x3002;<br>&#x5F81;&#x5BA2;&#x7121;&#x6B78;&#x65E5;&#xFF0C;<br>&#x7A7A;&#x60B2;&#x8559;&#x8349;&#x6467;&#x3002;</p><p>&#xA0;</p><h4><strong>Thu t&#x1EE9;</strong></h4><p>Y&#xEA;n Chi ho&#xE0;ng di&#x1EC7;p l&#x1EA1;c,<br>Thi&#x1EBF;p v&#x1ECD;ng t&#x1EF1; &#x111;&#x103;ng &#x111;&#xE0;i.<br>H&#x1EA3;i th&#x1B0;&#x1EE3;ng b&#xED;ch v&#xE2;n &#x111;o&#x1EA1;n,<br><span id="idf2e11828" class="popup-comment" data-related-poems="[{&quot;url&quot;:&quot;\\/Cao-Th%C3%ADch\\/Y%C3%AAn-ca-h%C3%A0nh\\/poem-OfaWWw-KGC1o9UcQz3Jy1g&quot;,&quot;title&quot;:&quot;Y\\u00ean ca h\\u00e0nh&quot;,&quot;author&quot;:&quot;Cao Th\\u00edch&quot;},{&quot;url&quot;:&quot;\\/L%E1%BB%87nh-H%E1%BB%93-S%E1%BB%9F\\/T%C3%A1i-h%E1%BA%A1-kh%C3%BAc-k%E1%BB%B3-1\\/poem-I3wKfKeNNSnHUJfobz6AnA&quot;,&quot;title&quot;:&quot;T\\u00e1i h\\u1ea1 kh\\u00fac k\\u1ef3 1&quot;,&quot;author&quot;:&quot;L\\u1ec7nh H\\u1ed3 S\\u1edf&quot;},{&quot;url&quot;:&quot;\\/H%E1%BB%93-T%E1%BA%B1ng\\/V%E1%BB%8Bnh-s%E1%BB%AD-thi-H%C3%A0-L%C6%B0%C6%A1ng\\/poem-xPJu2ANEK4bPw-mQ1ZG_Fw&quot;,&quot;title&quot;:&quot;V\\u1ecbnh s\\u1eed thi - H\\u00e0 L\\u01b0\\u01a1ng&quot;,&quot;author&quot;:&quot;H\\u1ed3 T\\u1eb1ng&quot;},{&quot;url&quot;:&quot;\\/%C4%90%C3%B4ng-Ph%C6%B0%C6%A1ng-C%E1%BA%A7u\\/Chi%C3%AAu-Qu%C3%A2n-o%C3%A1n-k%E1%BB%B3-2\\/poem-nyNkGPWh2OsnPjdyMNGU-w&quot;,&quot;title&quot;:&quot;Chi\\u00eau Qu\\u00e2n o\\u00e1n k\\u1ef3 2&quot;,&quot;author&quot;:&quot;\\u0110\\u00f4ng Ph\\u01b0\\u01a1ng C\\u1ea7u&quot;},{&quot;url&quot;:&quot;\\/Gi%E1%BA%A3-Ch%C3%AD\\/Xu%E1%BA%A5t-t%C3%A1i-kh%C3%BAc\\/poem-iC7_a8vgr2rtbIng0yzMRA&quot;,&quot;title&quot;:&quot;Xu\\u1ea5t t\\u00e1i kh\\u00fac&quot;,&quot;author&quot;:&quot;Gi\\u1ea3 Ch\\u00ed&quot;},{&quot;url&quot;:&quot;\\/S%E1%BA%A7m-Tham\\/Tri%E1%BB%87u-t%C6%B0%E1%BB%9Bng-qu%C3%A2n-ca\\/poem-ewFKlhoPECIc4wyIoeEdGQ&quot;,&quot;title&quot;:&quot;Tri\\u1ec7u t\\u01b0\\u1edbng qu\\u00e2n ca&quot;,&quot;author&quot;:&quot;S\\u1ea7m Tham&quot;},{&quot;url&quot;:&quot;\\/V%C6%B0%C6%A1ng-X%C6%B0%C6%A1ng-Linh\\/T%C3%B2ng-qu%C3%A2n-h%C3%A0nh\\/poem-80Z2cSe9PVPp1xmQ219nbA&quot;,&quot;title&quot;:&quot;T\\u00f2ng qu\\u00e2n h\\u00e0nh&quot;,&quot;author&quot;:&quot;V\\u01b0\\u01a1ng X\\u01b0\\u01a1ng Linh&quot;},{&quot;url&quot;:&quot;\\/S%E1%BA%A7m-Tham\\/Nhi%E1%BB%87t-H%E1%BA%A3i-h%C3%A0nh-t%E1%BB%91ng-Th%C3%B4i-th%E1%BB%8B-ng%E1%BB%B1-ho%C3%A0n-kinh\\/poem-7PKSPJiR7OpVcwgxW92kiA&quot;,&quot;title&quot;:&quot;Nhi\\u1ec7t H\\u1ea3i h\\u00e0nh t\\u1ed1ng Th\\u00f4i th\\u1ecb ng\\u1ef1 ho\\u00e0n kinh&quot;,&quot;author&quot;:&quot;S\\u1ea7m Tham&quot;},{&quot;url&quot;:&quot;\\/L%C3%BD-B%E1%BA%A1ch\\/U-Ch%C3%A2u-H%E1%BB%93-m%C3%A3-kh%C3%A1ch-ca\\/poem-bTf_52UQUpmjhfVHO5qnaA&quot;,&quot;title&quot;:&quot;U Ch\\u00e2u H\\u1ed3 m\\u00e3 kh\\u00e1ch ca&quot;,&quot;author&quot;:&quot;L\\u00fd B\\u1ea1ch&quot;},{&quot;url&quot;:&quot;\\/D%C6%B0%C6%A1ng-%C4%90%E1%BA%A1t\\/Minh-phi-o%C3%A1n\\/poem-t3B_OpO7PBOMWzJ-HxZbBQ&quot;,&quot;title&quot;:&quot;Minh phi o\\u00e1n&quot;,&quot;author&quot;:&quot;D\\u01b0\\u01a1ng \\u0110\\u1ea1t&quot;},{&quot;url&quot;:&quot;\\/%C4%90%E1%BB%97-Ph%E1%BB%A7\\/Ti%E1%BB%81n-xu%E1%BA%A5t-t%C3%A1i-k%E1%BB%B3-8\\/poem-ZmljLDicCUxObE3f1Bl41A&quot;,&quot;title&quot;:&quot;Ti\\u1ec1n xu\\u1ea5t t\\u00e1i k\\u1ef3 8&quot;,&quot;author&quot;:&quot;\\u0110\\u1ed7 Ph\\u1ee7&quot;}]">Thi&#x1EC1;n Vu</span><i class="fa fa-info-circle popupcmt"></i> thu s&#x1EAF;c lai.<br>H&#x1ED3; binh sa t&#xE1;i h&#x1EE3;p,<br>H&#xE1;n s&#x1EE9; Ng&#x1ECD;c Quan h&#x1ED3;i.<br>Chinh kh&#xE1;ch v&#xF4; quy nh&#x1EAD;t,<br>Kh&#xF4;ng bi hu&#x1EC7; th&#x1EA3;o t&#x1ED3;i.</p><p>&#xA0;</p>\n\t\t\t\t\t<h4><strong>D&#x1ECB;ch ngh&#x129;a</strong></h4>\n\t\t\t\t\t<p>&#x1EDE; Y&#xEA;n Chi l&#xE1; v&#xE0;ng r&#x1A1;i<br>Thi&#x1EBF;p t&#x1EF1; l&#xEA;n &#x111;&#xE0;i cao ng&#xF3;ng nh&#xEC;n<br>Tr&#xEA;n v&#xF9;ng Thanh H&#x1EA3;i, m&#xE2;y bi&#x1EBF;c &#x111;&#x1EE9;t kh&#xFA;c<br>N&#x1A1;i bi&#xEA;n &#x1EA3;i v&#xF9;ng &#x111;&#x1EA5;t c&#x1EE7;a r&#x1EE3; H&#x1ED3;, s&#x1EAF;c thu &#x111;&#xE3; l&#x1EA1;i t&#x1EDB;i<br>Qu&#xE2;n H&#x1ED3; k&#xE9;o &#x111;&#x1EBF;n &#x111;&#x1EA7;y tr&#x1B0;&#x1EDB;c &#x1EA3;i c&#xE1;t<br>S&#x1EE9; nh&#xE0; H&#xE1;n t&#x1EEB; Ng&#x1ECD;c M&#xF4;n quan tr&#x1EDF; v&#x1EC1;<br>L&#xED;nh chinh chi&#x1EBF;n ch&#x1B0;a bi&#x1EBF;t ng&#xE0;y n&#xE0;o m&#x1EDB;i tr&#x1EDF; v&#x1EC1;<br>Ch&#x1EC9; th&#x1B0;&#x1A1;ng cho c&#x1ECF; hu&#x1EC7; &#xFA;a t&#xE0;n</p>'
  const poem = formatPoem(html)
  expect(poem.length).toBe(3)
  poem.forEach((data) => {
    expect(data).toEqual(expect.objectContaining({
      title: expect.any(String),
      content: expect.any(String),
    }))
  })
})
