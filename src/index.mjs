
/** 
 * イベント設定：「追加」ボタン
 */
const onClickAdd = () => {
  // 入力した値を取得し、初期化する
  const inputText = document.querySelector('#addText').value;
  document.querySelector('#addText').value = '';

  // 未完了リストに追加
  createIncompleteList(inputText);
}

/**
 * 未完了リストから指定の要素を削除
 */
const deleteFromIncompleteItem = (target) => {
  document.querySelector('#incompleteList').removeChild(target);
}

/**
 * 未完了リストに追加する関数
 */
const createIncompleteList = (text) => {
  // item HTML生成
  const item = document.createElement('li');
  item.classList.add('todoArea__item', 'flex');
  
  // pタグ生成
  const p = document.createElement('p');
  p.classList.add('flex');
  p.innerText = text;
  
  // control HTML生成
  const control = document.createElement('div');
  control.classList.add('todoArea__control', 'flex');

  /**
   * 完了ボタン
   */
  // タグ生成
  const btnComplete = document.createElement('button');
  btnComplete.classList.add('btn', 'btn_complete');
  btnComplete.innerText = '完了';

  // 押された削除ボタンの親itemを未完了リストから削除、完了したTODOに移動
  btnComplete.addEventListener('click', () => {
    const completeTarget = btnComplete.parentNode.parentNode;
    deleteFromIncompleteItem(completeTarget);

    // 完了リストに追加する要素を生成
    const item = btnComplete.parentNode.parentNode;
    const text = item.firstElementChild.innerText;
    // console.log(text);

    // item以下を初期化
    item.textContent = null;
    
    // pタグ生成
    const p = document.createElement('p');
    p.classList.add('flex');
    p.innerText = text;
    
    // control HTML生成
    const control = document.createElement('div');
    control.classList.add('todoArea__control', 'flex');
    
    // button生成
    const btnBack = document.createElement('button');
    btnBack.classList.add('btn', 'btn_back');
    btnBack.innerText = '戻す';
    control.appendChild(btnBack);

    btnBack.addEventListener('click', () => {
      // 親タグを完了リストから削除する
      const deleteTarget = btnBack.parentNode.parentNode;
      document.querySelector('#completeList').removeChild(deleteTarget);

      // テキスト取得、未完了リストに追加
      const text = btnBack.parentNode.parentNode.firstElementChild.innerText;
       createIncompleteList(text);
    })

    // itemの子要素に設定
    item.appendChild(p);
    item.appendChild(control);
    
    // 完了のリストに追加
    document.querySelector('#completeList').appendChild(item);
  })
  

  /**
   * 削除ボタン
   */
  // タグ生成
  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'btn_delete');
  btnDelete.innerText = '削除';

  // 押された削除ボタンの親itemを未完了リストから削除
  btnDelete.addEventListener('click', () => {
    const deleteTarget = btnDelete.parentNode.parentNode;
    deleteFromIncompleteItem(deleteTarget);
  })

  // itemの子要素に設定
  item.appendChild(p);
  control.appendChild(btnComplete);
  control.appendChild(btnDelete);
  item.appendChild(control);

  // 未完了のリストに追加
  document.querySelector('#incompleteList').appendChild(item);
}

document
  .querySelector('#addBtn')
  .addEventListener('click', () => onClickAdd());