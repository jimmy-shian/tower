try:
    # 读取文件内容
    with open('monster_data.js', 'r', encoding='utf-8' ) as file:
        content = file.read()
    # replace  "	s	s	s	" to "\n", {"<board ss>", "</board ss>", "<board 1,2,3,4>", "\n ss \n"} to "\n",
    modified_content = content.replace('				', '\n').replace('<board>', '\n').replace('</board>', '\n').replace('<board 1>', '\n').replace('<board 2>', '\n').replace('<board 3>', '\n').replace('<board 4>', '\n')
    # 分割内容成行
    content = modified_content.replace('\n\n', '\n')

    lines = content.split('\n')
    # 在第二个换行符之后插入新的文本
    text = '''// replace  "	s	s	s	" to "\\n", {"<board ss>", "</board ss>", "<board 1,2,3,4>", "\\n ss \\n"} to "\\n",
// 2475,2730 teamSkill-activate error = 兩個地方  組合技能：流水盛宴
//                'activate': '以「燕尾執事 ‧ 伯勒爾」及「天之嬌女 ‧ 愛美美」作成員 (角色等級達 50 或以上)',
'''
    lines.insert(1, text)

    # 将修改后的内容写回文件
    content = '\n'.join(lines)

    # 将修改后的内容写回文件
    with open('monster_data.js', 'w', encoding='utf-8' ) as file:
        file.writelines(content)
except Exception as e:
    print(f"An error occurred: {str(e)}")

try:
    # 读取文件内容
    with open('leader_skill_data.js', 'r', encoding='utf-8' ) as file:
        content = file.read()
    # replace  "	s	s	s	" to "\n", {"<board ss>", "</board ss>", "<board 1,2,3,4>", "\n ss \n"} to "\n",
    content = content.replace('		', '\n')
    # 分割内容成行
    lines = content.split('\n')

    # 在第二个换行符之后插入新的文本
    text = '''// replace  "	ss	" to "\\n"
// 機偶係列 description error'''
    lines.insert(1, text)

    # 将修改后的内容写回文件
    content = '\n'.join(lines)

    # 将修改后的内容写回文件
    with open('leader_skill_data.js', 'w', encoding='utf-8' ) as file:
        file.writelines(content)
except Exception as e:
    print(f"An error occurred: {str(e)}")

import os

# 設定目標資料夾路徑
folder_path = './'  # 假設檔案在當前資料夾，若不是，請修改路徑

# 設定要保留的檔案名稱
keep_files = ['monster_data.js', 'leader_skill_data.js', 'replace.py']

try:
    # 列出資料夾中的所有檔案
    files = os.listdir(folder_path)

    # 遍歷所有檔案，刪除不在保留列表中的檔案
    for file_name in files:
        if file_name not in keep_files:
            file_path = os.path.join(folder_path, file_name)
            if os.path.isfile(file_path):  # 確保是檔案而非資料夾
                os.remove(file_path)
                print(f"已刪除: {file_name}")

except Exception as e:
    print(f"發生錯誤: {str(e)}")

input("It's OK. Press Enter to exit...")
