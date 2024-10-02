@echo off
setlocal

rem 定义源路径和目标路径
set "source_img=C:\Users\Administrator\Desktop\tos_tools-main\tos_tool_data\img\monster"
set "dest_img=C:\Users\Administrator\Desktop\tower\img\monster"
set "source_js=C:\Users\Administrator\Desktop\tos_tools-main\tos_tool_data\js"
set "dest_js=C:\Users\Administrator\Desktop\tower\js"

rem 创建目标文件夹（如果不存在）
if not exist "%dest_img%" (
    mkdir "%dest_img%"
)

rem 复制图片（相同名称不替代）
for %%f in ("%source_img%\*.*") do (
    if not exist "%dest_img%\%%~nxf" (
        copy "%%f" "%dest_img%\"
    )
)

rem 复制 JS 文件并替代
copy /Y "%source_js%\monster_data.js" "%dest_js%\"
copy /Y "%source_js%\leader_skill_data.js" "%dest_js%\"

echo 复制完成。
endlocal
pause