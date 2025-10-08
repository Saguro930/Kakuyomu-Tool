// content_script.js

// デフォルトと保存された設定のキー
const FONT_SIZE_STORAGE_KEY = 'kakuyomu_custom_font_size';
const DEFAULT_FONT_SIZE = 16; // 初期値 16px

/**
 * 小説本文の段落の文字サイズを適用する
 * @param {number} size - フォントサイズ (px単位)
 */
function applyFontSize(size) {
    const novelBodyContainer = document.querySelector('.widget-episodeBody');
    if (!novelBodyContainer) return;

    // 小説本文の段落を取得
    const paragraphs = novelBodyContainer.querySelectorAll('p');
    const fontSizePx = `${size}px`;

    paragraphs.forEach(p => {
        p.style.fontSize = fontSizePx;
    });

    // 本文以外の関連要素も調整する場合
    // 例: .widget-episodeBody の直接の子要素（タイトルなど）
    // novelBodyContainer.style.fontSize = fontSizePx; 
    
    console.log(`文字サイズを ${size}px に設定しました。`);
}

/**
 * 設定UIパネルを作成し、ページに追加する
 * @param {number} initialSize - 初期のスライダー値
 */
function createSettingsPanel(initialSize) {
    const panel = document.createElement('div');
    panel.className = 'kakuyomu-custom-settings-panel';
    panel.innerHTML = `
        <div class="setting-group">
            <label for="font-size-slider">文字サイズ (<span id="current-font-size">${initialSize}</span>px)</label>
            <input type="range" id="font-size-slider" class="font-size-slider" 
                   min="10" max="30" value="${initialSize}" step="1">
        </div>
        
        <div class="setting-group">
            <label>背景色</label>
            <p style="font-size: 12px; margin: 5px 0;">(実装は省略)</p>
        </div>
        
        `;

    document.body.appendChild(panel);
    
    // スライダーと表示要素を取得
    const slider = panel.querySelector('#font-size-slider');
    const display = panel.querySelector('#current-font-size');

    // スライダーのイベントリスナーを設定
    slider.addEventListener('input', (event) => {
        const newSize = parseInt(event.target.value, 10);
        
        // 1. 本文に新しいサイズを適用
        applyFontSize(newSize);
        
        // 2. 表示テキストを更新
        display.textContent = newSize;

        // 3. ブラウザに新しい設定を保存
        chrome.storage.local.set({ [FONT_SIZE_STORAGE_KEY]: newSize });
    });
}


/**
 * メインの処理
 */
window.addEventListener('load', function() {
    
    // 1. chrome.storageから保存されたフォントサイズを読み込む
    chrome.storage.local.get([FONT_SIZE_STORAGE_KEY], function(result) {
        const savedSize = result[FONT_SIZE_STORAGE_KEY];
        const initialSize = savedSize || DEFAULT_FONT_SIZE;

        // 2. 本文に初期サイズを適用
        applyFontSize(initialSize);

        // 3. 設定パネルを生成し、ページに追加
        createSettingsPanel(initialSize);
    });

    // カクヨムの右上の「ぁあ」アイコンをクリックしてパネル表示/非表示を切り替える機能を追加するなど、
    // さらなるカスタマイズが可能です。
});
