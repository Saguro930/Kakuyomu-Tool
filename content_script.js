// content_script.js

/**
 * カクヨムの小説閲覧ページのデザインをカスタマイズするスクリプト
 */
(function() {
    // ページが完全に読み込まれるのを待つ
    window.addEventListener('load', function() {
        // 小説本文を含むメインのコンテナ要素を特定
        const novelBodyContainer = document.querySelector('.widget-episodeBody');

        // ★ 文字サイズの設定値 (ここを自由に変更してください) ★
        const desiredFontSize = '18px'; // 例: 18ピクセル

        if (novelBodyContainer) {
            console.log("カクヨムの本文コンテナを発見。文字サイズを" + desiredFontSize + "に設定します。");

            // 1. 本文コンテナ内のすべてのテキスト要素（段落）を取得
            // <p>タグが本文の段落です
            const paragraphs = novelBodyContainer.querySelectorAll('p');
            
            // 2. 各段落に新しい文字サイズを適用
            paragraphs.forEach(p => {
                // 既存の文字サイズ設定を上書きして、細かく指定したサイズを適用
                p.style.fontSize = desiredFontSize;
                
                // 行間も同時に調整したい場合は、ここで設定します（例: 1.8倍）
                // p.style.lineHeight = '1.8';
            });
            
            // ----------------------------------------------------
            // (オプション) 背景色や文字色を調整したい場合
            // ----------------------------------------------------
            // 例: 背景色は白に戻し、文字色は黒にする
            novelBodyContainer.style.backgroundColor = 'white'; 
            paragraphs.forEach(p => {
                p.style.color = '#333333';
            });
            document.body.style.backgroundColor = 'white';
            // ----------------------------------------------------

        } else {
            console.log("カクヨムの本文コンテナが見つかりませんでした。");
        }
    });
})();
