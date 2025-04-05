window.addEventListener("load", function() {
  var raceFilter_img = document.getElementById("raceFilter");
  var raceImage = document.getElementById("raceImage");
  var attributeFilter_img = document.getElementById("attributeFilter");
  var attributeImage = document.getElementById("attributeImage");

  // 預設的圖片路徑
  var defaultRaceImagePath = "img/icon/icon_race_all.png";
  var defaultAttributeImagePath = "img/icon/icon_attr_all.png";

  // 初始化圖片
  raceImage.src = defaultRaceImagePath;
  attributeImage.src = defaultAttributeImagePath;

  raceFilter_img.addEventListener("change", function() {
    updateImage(raceFilter_img, raceImage, {
      "人類": "img/icon/icon_human.png",
      "獸類": "img/icon/icon_beast.png",
      "妖精類": "img/icon/icon_elf.png",
      "龍類": "img/icon/icon_dragon.png",
      "神族": "img/icon/icon_god.png",
      "魔族": "img/icon/icon_demon.png",
      "機械族": "img/icon/icon_machina.png",
      "進化素材": "img/icon/icon_evolve.png",
      "強化素材": "img/icon/icon_level_up.png",
      "all": defaultRaceImagePath
    });
  });

  attributeFilter_img.addEventListener("change", function() {
    updateImage(attributeFilter_img, attributeImage, {
      "水": "img/icon/icon_w.png",
      "火": "img/icon/icon_f.png",
      "木": "img/icon/icon_e.png",
      "光": "img/icon/icon_l.png",
      "暗": "img/icon/icon_d.png",
      "all": defaultAttributeImagePath
    });
  });
});

// 使用 currentCard 變數追蹤目前顯示的物件，實現自動收起效果
// 將 "results" 替換為實際容器元素的 id，並根據需要調整其他選擇器
// 點選物件時，上一個物件會自動收起，點選空白區域也會收起目前顯示的物件。
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('results');
  var currentCard = null;

  container.addEventListener('click', function (event) {
    if (event.target.classList.contains('cardimg-big')) {
      var card = event.target.closest('.card');
      var cardOutId = event.target.closest('.card-out-id');
      var cardId = cardOutId.querySelector('.card-name-id');
      var cardName = card.querySelector('.card-name');
      var skillSection = card.querySelector('.card-skill');
      var teamSkillSection = card.querySelector('.card-teamskill');
      var leaderSkillSection = card.querySelector('.leaderskill');

      // 切换显示状态
      cardId && (cardId.style.display = 'none');
      cardName && (cardName.style.display = 'flex');
      skillSection && (skillSection.style.display = 'flex');
      teamSkillSection && (teamSkillSection.style.display = 'flex');
      leaderSkillSection && (leaderSkillSection.style.display = 'flex');

      // 添加过渡效果的类
      if (window.innerWidth <= 768) {
        card.style.width = '80%';
        card.style.height = '570px';
      } else {
        card.style.position = 'fixed';
        card.style.transform = 'translate(-50%, -50%)';
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.width = '520px';
        card.style.height = '70%';
        card.style.zIndex = '1000';
      }

      // 恢复上一个物件的状态
      if (currentCard && currentCard !== card) {
        var preCardOutId = currentCard.querySelector('.card-out-id');
        var preCardId = currentCard.closest('.card-out-id').querySelector('.card-name-id');
        var prevCardName = currentCard.querySelector('.card-name');
        var prevSkillSection = currentCard.querySelector('.card-skill');
        var prevTeamSkillSection = currentCard.querySelector('.card-teamskill');
        var prevLeaderSkillSection = currentCard.querySelector('.leaderskill');

        preCardId && (preCardId.style.display = 'flex');
        prevCardName && (prevCardName.style.display = 'none');
        prevSkillSection && (prevSkillSection.style.display = 'none');
        prevTeamSkillSection && (prevTeamSkillSection.style.display = 'none');
        prevLeaderSkillSection && (prevLeaderSkillSection.style.display = 'none');

        currentCard.style.position = '';
        currentCard.style.transform = '';
        currentCard.style.top = '';
        currentCard.style.left = '';
        currentCard.style.width = '';
        currentCard.style.height = '';
        currentCard.style.zIndex = '';
      }

      currentCard = card;

      event.stopPropagation();
    }
  });
  document.addEventListener('click', clickOrKeyDownHandler);
  document.addEventListener('keydown', clickOrKeyDownHandler);
  
  function clickOrKeyDownHandler(event) {
  // document.addEventListener('click'||'keydown', function (event) {
    if (!event.target.closest('.card')) {
      if (currentCard) {
        var cardOutId = currentCard.querySelector('.card-out-id');
        var cardId = currentCard.closest('.card-out-id').querySelector('.card-name-id');
        var cardName = currentCard.querySelector('.card-name');
        var skillSection = currentCard.querySelector('.card-skill');
        var teamSkillSection = currentCard.querySelector('.card-teamskill');
        var leaderSkillSection = currentCard.querySelector('.leaderskill');

        cardId && (cardId.style.display = 'flex');
        cardName && (cardName.style.display = 'none');
        skillSection && (skillSection.style.display = 'none');
        teamSkillSection && (teamSkillSection.style.display = 'none');
        leaderSkillSection && (leaderSkillSection.style.display = 'none');

        currentCard.style.position = '';
        currentCard.style.transform = '';
        currentCard.style.top = '';
        currentCard.style.left = '';
        currentCard.style.width = '';
        currentCard.style.height = '';
        currentCard.style.zIndex = '';

        currentCard = null;
      }
    }
  // });
  }
});

const toggleSwitch = document.getElementById('toggleSwitch');
const toggleText = document.getElementById('toggleText');
// toggleText.textContent = '簡易搜尋';
// toggleSwitch.parentNode.appendChild(toggleText);

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    toggleText.textContent = '簡易搜尋';
    console.log('開關 打開');
  } else {
    toggleText.textContent = '詳細搜尋';
    console.log('開關 關閉');
  }
});

// 初始化搜索模式文本
const initialToggleState = toggleSwitch.checked;
toggleText.textContent = initialToggleState ? '簡易搜尋' : '詳細搜尋';

// 主題切換功能
const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const htmlElement = document.documentElement;

// 檢查本地存儲中是否有保存的主題設置
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  if (savedTheme === 'dark') {
    themeToggle.checked = true;
    themeText.textContent = '深色模式';
  }
}

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    htmlElement.setAttribute('data-theme', 'dark');
    themeText.textContent = '深色模式';
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    themeText.textContent = '淺色模式';
    localStorage.setItem('theme', 'light');
  }
});

// 處理種族和屬性按鈕的選擇邏輯
document.addEventListener('DOMContentLoaded', function() {
  // 種族按鈕邏輯
  const allRaceBtn = document.querySelector('.race-btn[data-value="all"]');
  const raceBtns = document.querySelectorAll('.race-btn:not([data-value="all"])');
  const selectedRaces = new Set(['all']); // 初始化已選種族集合
  
  // 處理種族按鈕點擊
  document.querySelector('.race-select').addEventListener('click', function(event) {
    const btn = event.target.closest('.race-btn');
    if (!btn) return;
    
    const value = btn.dataset.value;
    
    if (value === 'all') {
      // 點擊「所有種族」按鈕
      selectedRaces.clear();
      selectedRaces.add('all');
      allRaceBtn.classList.add('active');
      raceBtns.forEach(btn => btn.classList.remove('active'));
    } else {
      // 點擊特定種族按鈕
      if (btn.classList.contains('active')) {
        // 取消選擇
        btn.classList.remove('active');
        selectedRaces.delete(value);
        
        // 如果沒有選擇任何種族，自動選擇「所有種族」
        if (selectedRaces.size === 0 || (selectedRaces.size === 1 && selectedRaces.has('all'))) {
          selectedRaces.clear();
          selectedRaces.add('all');
          allRaceBtn.classList.add('active');
        }
      } else {
        // 選擇特定種族
        btn.classList.add('active');
        selectedRaces.add(value);
        
        // 取消「所有種族」的選擇
        if (selectedRaces.has('all')) {
          selectedRaces.delete('all');
          allRaceBtn.classList.remove('active');
        }
      }
    }
  });
  
  // 屬性按鈕邏輯
  const allAttributeBtn = document.querySelector('.attribute-btn[data-value="all"]');
  const attributeBtns = document.querySelectorAll('.attribute-btn:not([data-value="all"])');
  const selectedAttributes = new Set(['all']); // 初始化已選屬性集合
  
  // 處理屬性按鈕點擊
  document.querySelector('.attribute-select').addEventListener('click', function(event) {
    const btn = event.target.closest('.attribute-btn');
    if (!btn) return;
    
    const value = btn.dataset.value;
    
    if (value === 'all') {
      // 點擊「所有屬性」按鈕
      selectedAttributes.clear();
      selectedAttributes.add('all');
      allAttributeBtn.classList.add('active');
      attributeBtns.forEach(btn => btn.classList.remove('active'));
    } else {
      // 點擊特定屬性按鈕
      if (btn.classList.contains('active')) {
        // 取消選擇
        btn.classList.remove('active');
        selectedAttributes.delete(value);
        
        // 如果沒有選擇任何屬性，自動選擇「所有屬性」
        if (selectedAttributes.size === 0 || (selectedAttributes.size === 1 && selectedAttributes.has('all'))) {
          selectedAttributes.clear();
          selectedAttributes.add('all');
          allAttributeBtn.classList.add('active');
        }
      } else {
        // 選擇特定屬性
        btn.classList.add('active');
        selectedAttributes.add(value);
        
        // 取消「所有屬性」的選擇
        if (selectedAttributes.has('all')) {
          selectedAttributes.delete('all');
          allAttributeBtn.classList.remove('active');
        }
      }
    }
  });

  // 初始化搜索模式文本
  const toggleSwitch = document.getElementById('toggleSwitch');
  const toggleText = document.getElementById('toggleText');
  if (toggleSwitch.checked) {
    toggleText.textContent = '簡易搜尋';
  } else {
    toggleText.textContent = '詳細搜尋';
  }
});


function updateImage(filter, image, imageMap) {
  var selectedOption = filter.options[filter.selectedIndex].value;
  var imgSrc = imageMap[selectedOption] || "";
  image.src = imgSrc;
}

function handleKeyPress(event) {
  if (event.keyCode === 13 || event.key === 'Enter') {
    performSearch();
  }
}
function handleKeyPress1() {
  performSearch();
}
function performSearch() {
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("results").innerHTML = "";
  document.getElementById("results_show_mse").innerHTML = "";
  setTimeout(searchJSON, 0); // 在按下 Enter 键后延迟 500 毫秒触发搜索功能
}
document.addEventListener('keydown', handleKeyPress);

var numberInput = document.getElementById("searchInput")
// 添加事件監聽器，當按下 "/" 鍵時將焦點設定在輸入框上
document.addEventListener('keydown', function(event) {
  if (event.key === '/') {
    event.preventDefault(); // 防止斜線字符出現在輸入框中
    numberInput.focus(); // 將焦點設定在輸入框上
    numberInput.value = ''; // 清除輸入框中的值
  }
});
// 添加事件监听器，当输入框被点击时清除输入框的内容
let shouldClearInput = true;  
document.addEventListener('click', function(event) {
  if (shouldClearInput && numberInput === document.activeElement) {
    numberInput.value = ''; // 清除輸入框中的值
  }
});
numberInput.addEventListener('input', function(event) {
  shouldClearInput = false; // 禁止清除輸入框中的值
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
  }
  
  function scrollToBottom() {
      window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth' // 平滑滾動
      });
  }

  // 監聽視窗滾動事件
  window.addEventListener('scroll', function() {
    var backToTop = document.getElementById('back-to-top');
    var scrollToBottom = document.getElementById('scroll-to-bottom');
    var scrollPosition = window.pageYOffset;

    if (scrollPosition >= document.body.scrollHeight - window.innerHeight) {
      // 在最底時，只顯示回到最頂按鍵，隱藏滾動到最底按鍵
      backToTop.style.display = 'block';
      scrollToBottom.style.display = 'none';
    } else if (scrollPosition > 100) {
      // 在中間時，兩個按鍵都顯示
      backToTop.style.display = 'block';
      scrollToBottom.style.display = 'block';
    } else {
      // 在最頂時，只顯示滾動到最底按鍵，隱藏回到最頂按鍵
      backToTop.style.display = 'none';
      scrollToBottom.style.display = 'block';
    }
  });


    function mergeArabicNumbers(inputString) {
        inputString = inputString;
        let mergedString = '';
        let currentNumber = '';
        for (let i = 0; i < inputString.length; i++) {
            const char = inputString[i];
            if (/[0-9.]/.test(char)) {
                currentNumber += String(char);
            } else {
                if (currentNumber !== '') {
                    mergedString += `,${currentNumber},`;
                    currentNumber = '';
                }
                mergedString = mergedString + ',' + String(char) + ',' ;
            }
        }
        if (currentNumber !== '') {
            mergedString += `${currentNumber}`;
        }
        return String(mergedString)
    }
    
function getSelectedFields() {
  var selectedFields = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(checkbox => {
    var fieldName = checkbox.getAttribute("data-field");
    // var isSwitchOn = checkbox.getAttribute("data-field");
      selectedFields.push({
        fieldName: fieldName,
        // isSwitchOn: isSwitchOn
      });
  });
  console.log('selectedFields',selectedFields)
  return selectedFields;
}

document.getElementById("loading-spinner").style.display = "none";
console.log('nnon');

    var resultsDiv_show_mse = document.getElementById("results_show_mse");
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv_show_mse.innerHTML = ""; // &nbsp


    var mergedSearchKeyword;
    var mergedFieldValues_2;
    var select_flag = true;

//================== searchJSON ====================
    function searchJSON() {
        var searchKeyword = document.getElementById("searchInput").value.trim().toLowerCase() || " ";
        var isDetailedSearch = !document.getElementById("toggleSwitch").checked;
        
        // 根據搜尋模式處理關鍵字
        if (isDetailedSearch) {
            // 詳細搜尋：按空格分詞組匹配
            mergedSearchKeyword = searchKeyword.split(' ').filter(keyword => keyword !== '');
        } else {
            // 簡易搜尋：按字分詞
            // 將連續的數字視為一個整體
            let chars = [];
            let currentNumber = '';
            
            for (let i = 0; i < searchKeyword.length; i++) {
                if (/[0-9.]/.test(searchKeyword[i])) {
                    currentNumber += searchKeyword[i];
                } else {
                    if (currentNumber !== '') {
                        chars.push(currentNumber);
                        currentNumber = '';
                    }
                    if (searchKeyword[i] !== ' ') {
                        chars.push(searchKeyword[i]);
                    }
                }
            }
            
            if (currentNumber !== '') {
                chars.push(currentNumber);
            }
            
            mergedSearchKeyword = chars;
        }
        console.log('搜尋模式:', isDetailedSearch ? '詳細搜尋' : '簡易搜尋');
        console.log('搜尋關鍵字:', mergedSearchKeyword);
        
        var selectedFields = getSelectedFields();
        console.log(selectedFields);

        // 獲取選中的種族
        var selectedRaces = [];
        document.querySelectorAll('.race-btn.active').forEach(btn => {
            selectedRaces.push(btn.dataset.value);
        });
        
        // 獲取選中的屬性
        var selectedAttributes = [];
        document.querySelectorAll('.attribute-btn.active').forEach(btn => {
            selectedAttributes.push(btn.dataset.value);
        });
        
        // 檢查是否選中了「所有種族」或「所有屬性」
        var allRacesSelected = selectedRaces.includes('all');
        var allAttributesSelected = selectedAttributes.includes('all');
        
        // 如果沒有選中任何種族或屬性，預設為全選
        if (selectedRaces.length === 0) {
            allRacesSelected = true;
            // 自動選中「所有種族」按鈕
            document.querySelector('.race-btn[data-value="all"]').classList.add('active');
        }
        if (selectedAttributes.length === 0) {
            allAttributesSelected = true;
            // 自動選中「所有屬性」按鈕
            document.querySelector('.attribute-btn[data-value="all"]').classList.add('active');
        }
        var data_howmany = 0;
        console.log('not wait,data_howmany=',data_howmany);

        var filteredIndexes = [];
        var dataIndex = [];
        var dataIndex2 = [];

        var monster_id;
        var monster_name;

        var select_flag = true;
        var search_flag = false;

        var select_monstername_flag = false;
        var select_skill_flag = false;
        var select_leaderskill_flag = false;
        var select_teamskill_flag = false;
        var select_littlenum_cd_flag = false;
        var select_littlenum_ep_flag = false;
        var select_detailed_simple_flag = false;
        resultsDiv.innerHTML="";
        resultsDiv_show_mse.innerHTML = " &nbsp";

        if (select_flag){
            console.log('select_flag=',select_flag);
            for (var select_i = 0; select_i < selectedFields.length; select_i++) {
                var fieldName = selectedFields[select_i].fieldName;
                if (fieldName == 'monster_name') {
                    select_monstername_flag = true;
                }
                if (fieldName == 'skill') {
                    select_skill_flag = true;
                }
                if (fieldName == 'leader_skill') {
                    select_leaderskill_flag = true;
                }
                if (fieldName == 'team_skill') {
                    select_teamskill_flag = true;
                }
                if (fieldName == 'little_num_cd') {
                    select_littlenum_cd_flag = true;
                }if (fieldName == 'little_num_ep') {
                    select_littlenum_ep_flag = true;
                }
                if (fieldName == "switchField") {
                    select_detailed_simple_flag = true;
                }
            }
            
            select_flag = false;
        }

//================== 開始循環資料，然後先合併搜尋文字 ====================
        for (var i = 0; i < monster_data.length; i++) {
            var search_flag = false;
            var monster_word = "";
            var monster = monster_data[i];
                monster_id = monster['id'];
                monster_id2 = 'No. ' + monster_id.toString().padStart(3, '0');
                monster_name = monster['name'];
            var monster_idname = 'No. ' + monster_id + ` ${monster_name}`;
            
            var monster_attribute = monster['attribute'];
            var monster_race = monster['race'];

            var monster_skill = monster['skill'];

                var monster_skill_charge = monster['skill']['charge'];
                var monster_skill_num = monster['skill']['num'];

            var monster_teamSkill = monster['teamSkill'];
                var monster_teamSkill_description = monster_teamSkill['description'];
                var monster_teamSkill_activate = monster_teamSkill['activate'];
            
            if(select_skill_flag || select_littlenum_cd_flag || select_littlenum_ep_flag){// skill & CD/EP num
                for (var skill_i = 0; skill_i < monster_skill.length; skill_i++) {
                    if (select_skill_flag){
                        monster_word += (" " + monster_skill[skill_i]['description']);
                    }
                    if(select_littlenum_cd_flag){
                        if(monster_skill[skill_i]['charge'] == 'CD'){
                          if(monster_skill[skill_i]['num'] !== -1){
                            monster_word += (" " + monster_skill[skill_i]['num']);
                          }
                        }
                    }
                    if(select_littlenum_ep_flag){
                        if(monster_skill[skill_i]['charge'] == 'EP'){
                            monster_word += (" " + monster_skill[skill_i]['num']);
                        }
                    }
                }
            }
            // if(select_littlenum_flag){
            //     monster_word += monster_idname;
            // }
            if(select_monstername_flag){
                monster_word += ( " " + monster_idname);
            }
            if(select_leaderskill_flag){
                for (var leader_skill_data_i = 0; leader_skill_data_i < leader_skill_data.length; leader_skill_data_i++) {
                    var match_monster = leader_skill_data[leader_skill_data_i];
                    var leader_skill_name = match_monster['name'];
                    var leader_skill_description = match_monster['description'];
                    var leader_skill_monster = match_monster['monster'];

                    for (var leader_skill_monster_i = 0; leader_skill_monster_i < leader_skill_monster.length; leader_skill_monster_i++){
                        match_monster_item = leader_skill_monster[leader_skill_monster_i];
                        if(match_monster_item == monster_id){
                            monster_word += (" " + leader_skill_description);
                        }
                    }
                } 
            }
            if(select_teamskill_flag){
                for (var teamskill_i = 0; teamskill_i < monster_teamSkill.length; teamskill_i++) {
                    // if (monster_teamSkill[teamskill_i]['type'] == 'normal'){
                        monster_word += (" " + (monster_teamSkill[teamskill_i]['description'] + " " + monster_teamSkill[teamskill_i]['activate']));
                    // }
                }
            }
            // console.log('monster_word = ',monster_word)
            
//==================開始比對資料====================
            var isDetailedSearch = !document.getElementById("toggleSwitch").checked;
            var monster_word_lower = monster_word.toLowerCase();
            
            if (isDetailedSearch) {
              // 詳細搜尋：所有詞組都必須匹配
              search_flag = mergedSearchKeyword.every(keyword => monster_word_lower.includes(keyword));
            } else {
              // 簡易搜尋：任一字符匹配即可
              search_flag = mergedSearchKeyword.some(keyword => monster_word_lower.includes(keyword));
            }

//==================準備輸出資料====================
            if (search_flag){
              var dataMapping = {
                "人類": "icon_human",
                "獸類": "icon_beast",
                "妖精類": "icon_elf",
                "龍類": "icon_dragon",
                "神族": "icon_god",
                "魔族": "icon_demon",
                "機械族": "icon_machina",
                "進化素材": "icon_evolve",
                "強化素材": "icon_level_up",
                "水": "icon_w",
                "火": "icon_f",
                "木": "icon_e",
                "光": "icon_l",
                "暗": "icon_d",
              };
              // console.log('1');
              // console.log('monster_attribute',monster_attribute,"=",attributeFilter);
              // console.log('monster_race',monster_race,"=",raceFilter);
//================== 生成html ====================
try{
              // 檢查卡片是否符合選中的種族和屬性條件
              var matchesRace = allRacesSelected || selectedRaces.includes(monster_race);
              var matchesAttribute = allAttributesSelected || selectedAttributes.includes(monster_attribute);
              
              // 如果選擇了多個種族或屬性，只要符合其中之一即可
              if (!allRacesSelected && selectedRaces.length > 0) {
                matchesRace = selectedRaces.includes(monster_race);
              }
              
              if (!allAttributesSelected && selectedAttributes.length > 0) {
                matchesAttribute = selectedAttributes.includes(monster_attribute);
              }
              
              if (matchesRace && matchesAttribute && monster_name !== ""){
                data_howmany = data_howmany + 1;
                // 創建外層的 card 元素
                var cardOut = document.createElement("div");
                cardOut.classList.add("card-out-id");

                var resultItem = document.createElement("div");
                resultItem.classList.add("card");

                // 创建 cardimg-big 元素
                var container = document.createElement("div");
                container.style.display = "flex";
                container.style.justifyContent = "center";
                var cardImgBig = document.createElement("img");
                cardImgBig.classList.add("cardimg-big");
                // 设置图片路径和备用路径
                function loadImage(cardImgBig, monster_id, monster_attribute) {
                  return new Promise((resolve, reject) => {
                    cardImgBig.src = `img/monster/${monster_id}.png`;
                    cardImgBig.onload = resolve;
                    cardImgBig.onerror = reject;
                  });
                }
                async function handleImageError(cardImgBig, monster_id, monster_attribute) {
                  try {
                    await loadImage(cardImgBig, monster_id, monster_attribute);
                    console.log("tttrrryyy");
                  } catch (error) {
                    var pattern = /icon_([a-zA-Z]+)/;
                    var match = dataMapping[monster_attribute].match(pattern);
                    var extractedText = match[1]; // 提取的文本
                    cardImgBig.src = `img/monster/noname_${extractedText}.png`;
                  }
                }
                // 调用 handleImageError 函数
                handleImageError(cardImgBig, monster_id, monster_attribute);

                cardImgBig.alt = `${monster_name}`;
                container.appendChild(cardImgBig);
                resultItem.appendChild(container);

                // 創建 card-name 元素
                var cardName = document.createElement("div");
                cardName.classList.add("card-name");

                // 創建 <p> 元素並設置內容
                var cardNameParagraph = document.createElement("p");
                if(select_monstername_flag){
                  cardNameParagraph.innerHTML = markupTextWithSearchKeywords(monster_idname);
                }else{
                  cardNameParagraph.innerHTML = monster_idname;
                }
                cardName.appendChild(cardNameParagraph);
                // 創建第一個 cardimg-little 元素
                var cardImgLittle1 = document.createElement("img");
                cardImgLittle1.classList.add("cardimg-little");
                cardImgLittle1.src = `img/icon/${dataMapping[monster_attribute]}.png`;
                cardImgLittle1.alt = `${monster_attribute}`;
                cardName.appendChild(cardImgLittle1);

                // 創建第二個 cardimg-little 元素
                var cardImgLittle2 = document.createElement("img");
                cardImgLittle2.classList.add("cardimg-little");
                cardImgLittle2.src = `img/icon/${dataMapping[monster_race]}.png`;
                cardImgLittle2.alt = `${monster_race}`;
                cardName.appendChild(cardImgLittle2);

                resultItem.appendChild(cardName);

                // 創建 card-skill 元素
                var cardSkill = document.createElement("div");
                cardSkill.classList.add("card-skill");

                var prevName = ''; // 追蹤上一個項目的名稱
                for (var skill_ii = 0; skill_ii < monster_skill.length; skill_ii++) {
                  // 創建 card-skill-item 元素
                  if(monster_skill[skill_ii]['name'] !== prevName){
                    var cardSkillItem = document.createElement("div");
                    cardSkillItem.classList.add("card-skill-item");

                    // 創建 skill-p 元素
                    var skillP = document.createElement("div");
                    skillP.classList.add("skill-p");

                    // 創建 <p> 元素並設置內容
                    var skillPParagraph = document.createElement("p");
                    skillPParagraph.innerHTML = `${monster_skill[skill_ii]['name']}`;
                    skillP.appendChild(skillPParagraph);
                    cardSkillItem.appendChild(skillP);
                    // 創建 <p> 元素並設置內容
                    var skillPParagraph2
                    if (monster_skill[skill_ii]['num'] == -1){
                      skillPParagraph2 = document.createElement("img");

                      skillPParagraph2.innerHTML = `組合技能`;
                      skillPParagraph2.src = `img/icon/combine.png`;
                      skillPParagraph2.alt = `組合技能`;
                      // cardName.appendChild(cardImgLittle1);
                    }else{
                      skillPParagraph2 = document.createElement("p");

                      if(select_littlenum_cd_flag || select_littlenum_ep_flag){
                        skillPParagraph2.innerHTML = `${monster_skill[skill_ii]['charge']} &nbsp ${markupTextWithSearchKeywords(String(monster_skill[skill_ii]['num']))}`;
                      }else{
                        skillPParagraph2.innerHTML = `${monster_skill[skill_ii]['charge']} &nbsp ${monster_skill[skill_ii]['num']}`;
                      }
                    }
                    skillP.appendChild(skillPParagraph2);
                    cardSkillItem.appendChild(skillP);

                    // 創建 skill-detail 元素
                    var skillDetail = document.createElement("div");
                    skillDetail.classList.add("skill-detail");

                    // 創建 <p> 元素並設置內容
                    var skillDetailParagraph = document.createElement("div");
                    if(select_skill_flag){
                      skillDetailParagraph.innerHTML = `${markupTextWithSearchKeywords(monster_skill[skill_ii]['description'])}`;
                    }else{
                      skillDetailParagraph.innerHTML = `${monster_skill[skill_ii]['description']}`;
                    }
                    skillDetail.appendChild(skillDetailParagraph);
                    cardSkillItem.appendChild(skillDetail);
                    prevName = monster_skill[skill_ii]['name'];
                  }
                  cardSkill.appendChild(cardSkillItem);
                  resultItem.appendChild(cardSkill);
                }
                // 創建 card-teamskill 元素
                var cardTeamSkill = document.createElement("div");
                cardTeamSkill.classList.add("card-teamskill");
                
                for (var teamskill_ii = 0; teamskill_ii < monster_teamSkill.length; teamskill_ii++) {
                  // 創建 card-teamskill-item 元素
                  var cardTeamSkillItem = document.createElement("div");
                  cardTeamSkillItem.classList.add("card-teamskill-item");

                  // 創建 teamskill-p 元素
                  var teamSkillP = document.createElement("div");
                  teamSkillP.classList.add("teamskill-p"); 

                  // 創建 <p> 元素並設置內容
                  var teamSkillPParagraph = document.createElement("p");
                  if(select_teamskill_flag){
                    teamSkillPParagraph.innerHTML = `隊伍技能：${markupTextWithSearchKeywords(monster_teamSkill[teamskill_ii]['activate'])}`;
                  }else{
                    teamSkillPParagraph.innerHTML = `隊伍技能：${monster_teamSkill[teamskill_ii]['activate']}`;
                  }
                  teamSkillP.appendChild(teamSkillPParagraph);
                  cardTeamSkillItem.appendChild(teamSkillP);

                  // 創建 teamskill-detial 元素
                  var teamSkillDetail = document.createElement("div");
                  teamSkillDetail.classList.add("teamskill-detail");

                  // 創建 <p> 元素並設置內容
                  var teamSkillDetailParagraph = document.createElement("div");
                  if(select_teamskill_flag){
                    teamSkillDetailParagraph.innerHTML = `${markupTextWithSearchKeywords(monster_teamSkill[teamskill_ii]['description'])}`;
                  }else{
                    teamSkillDetailParagraph.innerHTML = `${monster_teamSkill[teamskill_ii]['description']}`;
                  }
                  teamSkillDetail.appendChild(teamSkillDetailParagraph);
                  cardTeamSkillItem.appendChild(teamSkillDetail);

                  cardTeamSkill.appendChild(cardTeamSkillItem);
                  resultItem.appendChild(cardTeamSkill);
                }

                // 創建 leaderskill 元素
                var leaderSkill = document.createElement("div");
                leaderSkill.classList.add("leaderskill");

                for (var leader_skill_data_ii = 0; leader_skill_data_ii < leader_skill_data.length; leader_skill_data_ii++) {
                    var match_monster = leader_skill_data[leader_skill_data_ii];
                    var leader_skill_name = match_monster['name'];
                    var leader_skill_description = match_monster['description'];
                    var leader_skill_monster = match_monster['monster'];

                    for (var leader_skill_monster_ii = 0; leader_skill_monster_ii < leader_skill_monster.length; leader_skill_monster_ii++){
                        match_monster_item = leader_skill_monster[leader_skill_monster_ii];
                        if(match_monster_item == monster_id){
                            // 創建 leaderskill-item 元素
                            var leaderSkillItem = document.createElement("div");
                            leaderSkillItem.classList.add("leaderskill-item");

                            // 創建 leaderskill-p 元素
                            var leaderSkillP = document.createElement("div");
                            leaderSkillP.classList.add("leaderskill-p");

                            // 創建 <p> 元素並設置內容
                            var leaderSkillPParagraph = document.createElement("p");
                            leaderSkillPParagraph.innerHTML = `隊長技：${leader_skill_name}`;
                            leaderSkillP.appendChild(leaderSkillPParagraph);
                            leaderSkillItem.appendChild(leaderSkillP);

                            // 創建 leaderskill-detail 元素
                            var leaderSkillDetail = document.createElement("div");
                            leaderSkillDetail.classList.add("leaderskill-detail");

                            // 創建 <p> 元素並設置內容
                            var leaderSkillDetailParagraph = document.createElement("div");
                            if(select_leaderskill_flag){
                              leaderSkillDetailParagraph.innerHTML = `${markupTextWithSearchKeywords(leader_skill_description)}`;
                            }else{
                              leaderSkillDetailParagraph.innerHTML = `${leader_skill_description}`;
                            }
                            leaderSkillDetail.appendChild(leaderSkillDetailParagraph);
                            leaderSkillItem.appendChild(leaderSkillDetail);

                            leaderSkill.appendChild(leaderSkillItem);
                            resultItem.appendChild(leaderSkill);
                        }
                    }
                } 
                cardOut.appendChild(resultItem)
                // 創建 card-name-id 元素
                var cardid = document.createElement("div");
                cardid.classList.add("card-name-id");
                // 創建 <p> 元素並設置內容
                var cardidParagraph = document.createElement("p");
                cardidParagraph.innerHTML = monster_id2;
                
                cardid.appendChild(cardidParagraph);
                cardOut.appendChild(cardid);
                
                resultsDiv.appendChild(cardOut);
              }
            }
            catch (error){
              console.log("錯誤 : " + error); // 输出异常信息
              console.log('monster_idname=',monster_idname);
            }
              // console.log('finish');
            }
            if(data_howmany !== 0){
              resultsDiv_show_mse.innerHTML = `共有 ${data_howmany} 筆 搜尋結果`;
            }
            else{
              resultsDiv_show_mse.innerHTML = `沒有搜尋結果，請再次嘗試<br>或前往<a style="color: var(--text-color); font-weight:600;" href="https://tinghan33704.com/tos_skill_filter/tos_skill_filter.html" target="_blank"> 神魔之塔主動技搜尋器</a> 進行搜尋`;
            }
        
        } // 資料查找完畢     
    document.getElementById("loading-spinner").style.display = "none";
    } // searchJson finish

// 使用正则表达式将文本标记为红色
function markupTextWithSearchKeywords(text) {
    var keywords = mergedSearchKeyword;
    var isDetailedSearch = !document.getElementById("toggleSwitch").checked;
    var textLower = text.toLowerCase();
    var markedText = text;
    
    // 将 keywords 转换为正则表达式安全的字符串
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    if (isDetailedSearch) {
        // 詳細搜尋：標記完整詞組
        for (let keyword of keywords) {
            if (keyword.trim() !== '') {
                const regex = new RegExp(keyword, 'gi');
                markedText = markedText.replace(regex, match => `<span class='like-strong'>${match}</span>`);
            }
        }
    } else {
        // 簡易搜尋：標記單個字符或連續數字
        for (let char of keywords) {
            if (char.trim() !== '') {
                // 檢查是否為數字
                if (/^[0-9.]+$/.test(char)) {
                    // 對於數字，使用精確匹配
                    const regex = new RegExp(`(^|\\D)(${char})(\\D|$)`, 'g');
                    markedText = markedText.replace(regex, (match, p1, p2, p3) => 
                        `${p1}<span class='like-strong'>${p2}</span>${p3}`);
                } else {
                    // 對於其他字符，使用普通匹配
                    const regex = new RegExp(char, 'gi');
                    markedText = markedText.replace(regex, match => 
                        `<span class='like-strong'>${match}</span>`);
                }
            }
        }
    }
    
    return markedText;
}


