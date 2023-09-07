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

var raceFilter_img = document.getElementById("raceFilter");
var raceImage = document.getElementById("raceImage");
var attributeFilter_img = document.getElementById("attributeFilter");
var attributeImage = document.getElementById("attributeImage");

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
    "強化素材": "img/icon/icon_level_up.png"
  });
});

attributeFilter_img.addEventListener("change", function() {
  updateImage(attributeFilter_img, attributeImage, {
    "水": "img/icon/icon_w.png",
    "火": "img/icon/icon_f.png",
    "木": "img/icon/icon_e.png",
    "光": "img/icon/icon_l.png",
    "暗": "img/icon/icon_d.png"
  });
});

function updateImage(filter, image, imageMap) {
  var selectedOption = filter.options[filter.selectedIndex].value;
  var imgSrc = imageMap[selectedOption] || "";
  image.src = imgSrc;
}
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        searchJSON(); // 在按下 Enter 键时触发搜索功能
    }
}
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


    var resultsDiv_show_mse = document.getElementById("results_show_mse");
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = " &nbsp";
    resultsDiv_show_mse.innerHTML = " &nbsp";


    var mergedSearchKeyword;
    var mergedFieldValues_2;
    var select_flag = true;

//================== searchJSON ====================
    function searchJSON() {
        var searchKeyword = document.getElementById("searchInput").value.trim().toLowerCase() //|| ".";
            mergedSearchKeyword = mergeArabicNumbers(searchKeyword).split(',').filter(keyword => keyword !== ''); //原本有var
        console.log(mergedSearchKeyword);
        
        var selectedFields = getSelectedFields();
        console.log(selectedFields);

        var raceFilter = document.getElementById("raceFilter").value;
        var attributeFilter = document.getElementById("attributeFilter").value;
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
                    if (monster_teamSkill[teamskill_i]['type'] == 'normal'){
                        monster_word += (" " + (monster_teamSkill[teamskill_i]['description'] + " " + monster_teamSkill[teamskill_i]['activate']));
                    }
                }
            }
            // console.log('monster_word = ',monster_word)
//==================開始比對資料====================
            mergedSearchKeyword = mergeArabicNumbers(searchKeyword).split(',').filter(keyword => keyword !== '');
            mergedmonster_word = mergeArabicNumbers(monster_word).split(',').filter(keyword => keyword !== '');
            // console.log('select_detailed_simple_flag=',select_detailed_simple_flag);
            // console.log('mergedSearchKeyword=',mergedSearchKeyword);
            // console.log('mergedmonster_word=',mergedmonster_word);
            if (select_detailed_simple_flag){
              if ((mergedSearchKeyword.some(keyword => mergedmonster_word.includes(keyword)))){
                search_flag = true; 
                // console.log('some');
              }
            }
            else{
                 if ((mergedSearchKeyword.every(keyword => mergedmonster_word.includes(keyword)))){
                  search_flag = true; 
                  // console.log('every');
                }
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
              if ((monster_attribute == attributeFilter || attributeFilter == "all") && (monster_race == raceFilter || raceFilter == "all") && (monster_name !== "")){
                data_howmany = data_howmany + 1;
                // 創建外層的 card 元素
                var resultItem = document.createElement("div");
                resultItem.classList.add("card");

                // 创建 cardimg-big 元素
                var container = document.createElement("div");
                container.style.display = "flex";
                container.style.justifyContent = "center";
                var cardImgBig = document.createElement("img");
                cardImgBig.classList.add("cardimg-big");
                cardImgBig.src = `img/monster/${monster_id}.png`;
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
                    var skillPParagraph2 = document.createElement("p");
                    if (monster_skill[skill_ii]['num'] == -1){
                      skillPParagraph2.innerHTML = `組合技能`;
                    }else{
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
                            leaderSkillPParagraph.innerHTML = `隊長技： ${leader_skill_name}`;
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
                resultsDiv.appendChild(resultItem);
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
              resultsDiv_show_mse.innerHTML = `沒有搜尋結果，請再次嘗試<br>或前往<a style="color:black; font-weight:600;" href="https://tinghan33704.com/tos_skill_filter/tos_skill_filter.html" target="_blank"> 神魔之塔主動技搜尋器</a> 進行搜尋`;
            }
            
//==================  ====================

            // if(monster_name == '超級水手月亮'){
            //     console.log( monster_id ,monster_name);
            //     for (var skill_i = 0; skill_i < monster_skill.length; skill_i++) {
            //         monster_skill_name = monster_skill[skill_i]['name'];
            //         monster_skill_description = monster_skill[skill_i]['description'];
            //         console.log( monster_skill_name ,monster_skill_description)
            //         // resultsDiv_show_mse.innerHTML = monster_skill_name + `${monster_skill_description}`;
            //                         // 根据需要创建 HTML 元素来展示结果
            //     var resultItem = document.createElement('div');
            //     var skillNameElement = document.createElement('h3');
            //     skillNameElement.textContent = monster_skill_name;
            //     var skillDescriptionElement = document.createElement('pre');
            //     skillDescriptionElement.textContent = monster_skill_description;

            //     // 将创建的元素添加到结果容器中
            //     resultItem.appendChild(skillNameElement);
            //     resultItem.appendChild(skillDescriptionElement);
            //     resultsDiv.appendChild(resultItem);
            //     }
            //     for (var leader_skill_data_i = 0; leader_skill_data_i < leader_skill_data.length; leader_skill_data_i++) {
            //         var match_monster = leader_skill_data[leader_skill_data_i];
            //         // console.log('innn= ');
            //         var leader_skill_name = match_monster['name'];
            //         var leader_skill_description = match_monster['description'];

            //         var leader_skill_monster = match_monster['monster'];

            //         // resultsDiv_show_mse.innerHTML = "";
                    
            //         for (var leader_skill_monster_i = 0; leader_skill_monster_i < leader_skill_monster.length; leader_skill_monster_i++){
            //             match_monster_item = leader_skill_monster[leader_skill_monster_i];
            //             // console.log('match_monster_item', match_monster_item);
            //             // console.log( leader_skill_monster_i);
            //             if(match_monster_item == "10344"){
            //                 // console.log( monster_id ,match_monster_item);
            //                 console.log( leader_skill_name  ,leader_skill_description);
            //                 var resultItem = document.createElement('div');
            //                 var skillNameElement = document.createElement('h3');
            //                 skillNameElement.textContent = leader_skill_name;
            //                 var skillDescriptionElement = document.createElement('pre');
            //                 skillDescriptionElement.textContent = leader_skill_description;

            //                 // 将创建的元素添加到结果容器中
            //                 resultItem.appendChild(skillNameElement);
            //                 resultItem.appendChild(skillDescriptionElement);
            //                 resultsDiv_show_mse.appendChild(resultItem);

            //             }
            //         }
            //     } 
            //     if (select_flag){
            //         for (var select_i = 0; select_i < selectedFields.length; select_i++) {
            //             console.log('selectedFields_i=', selectedFields[select_i]);
            //             if (selectedFields[select_i].fieldName == 'Image Name') {
            //                 select_imgname = 'No. ' + monster_id + ` ${monster_name}`;
            //                 console.log('select_imgname=', select_imgname);
            //                 select_flag = false;
            //             }
            //         }
            //     }
                
            // }
        
        } // 資料查找完畢          
    } // searchJson finish

  //       function markupTextWithSearchKeywords(text) {
  // var keywordList = mergedSearchKeyword;
// 使用正则表达式将文本标记为红色

// function markupTextWithSearchKeywords(text) {
//     // 将 keywords 转换为正则表达式安全的字符串
//     const escapedKeywords = mergedSearchKeyword.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
//  // 使用正则表达式将文本标记为红色
// // 使用正则表达式将文本标记为红色

//     // 创建正则表达式，用于匹配关键字，但排除包含在数字中的关键字
//     // const keywordPattern = new RegExp(`(?:\\b|[^0-9])(${escapedKeywords.join('|')})(?:\\b|[^0-9])`, 'gi');
//     const keywordPattern = new RegExp('\\b(' + escapedKeywords.join('|') + ')\\b', 'gi'); // 使用 \\b 表示单词边界

//     // 标记关键字为红色
//     const markedText = text.replace(keywordPattern, match => {
//         return `<span class='like-strong'>${match}</span>`;
//     });

//     return markedText;
// }

// 使用正则表达式将文本标记为红色
// 使用正则表达式将文本标记为红色
function markupTextWithSearchKeywords(text) {
    var keywords = mergedSearchKeyword;
    var text_box = "";
    // 将 keywords 转换为正则表达式安全的字符串
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    text = mergeArabicNumbers(text).split(',').filter(keyword => keyword !== '');
    // // 创建正则表达式，用于匹配包含在文本中的关键字
    // const keywordPattern = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

    // // 标记关键字为红色
    // const markedText = text.replace(keywordPattern, match => {
    //     return `<span class='like-strong'>${match}</span>`;
    // });
    // 创建正则表达式，用于匹配包含在文本中的关键字
    const keywordPattern = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    // 创建正则表达式，用于匹配包含在文本中的关键字
// const keywordPattern = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
    // 标记关键字为红色
    for (var texti of text){
      if(mergedSearchKeyword.includes(texti)){
        texti = `<span class='like-strong'>${texti}</span>`
        text_box += texti;
      }
      else{
        text_box += texti;
      }
    }
    // const markedText = text.replace(keywordPattern, match => {
    //     return `<span class='like-strong'>${match}</span>`;
    // });
    return text_box;
}


