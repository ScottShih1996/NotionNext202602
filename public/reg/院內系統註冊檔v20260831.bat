@echo off
echo ==========================================
echo 【自動取得管理員權限核心碼】
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo 正在嘗試取得管理員權限...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%~dp0"
:: 已取得管理員權限核心碼

echo 目前已成功以管理員身分執行！

echo ==========================================

setlocal
title Register Hospital URL Protocols

echo ============================================
echo Registering Hospital URL Protocols...
echo ============================================
echo.

REM ============================================================
REM 住院系統 - admc
REM ============================================================
reg delete "HKCR\admc" /f >nul 2>&1

reg add "HKCR\admc" /ve /t REG_SZ /d "URL:admc" /f
reg add "HKCR\admc" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\admc\shell" /f
reg add "HKCR\admc\shell\open" /f
reg add "HKCR\admc\shell\open\command" /ve /t REG_SZ /d "\"C:\admc\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM 急診系統 - newemr
REM ============================================================
reg delete "HKCR\newemr" /f >nul 2>&1

reg add "HKCR\newemr" /ve /t REG_SZ /d "URL:newemr" /f
reg add "HKCR\newemr" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\newemr\shell" /f
reg add "HKCR\newemr\shell\open" /f
reg add "HKCR\newemr\shell\open\command" /ve /t REG_SZ /d "\"C:\newemr\pemrproj.exe\" \"%%1\"" /f


REM ============================================================
REM 電子病歷簽章系統 - NewEmrSign
REM ============================================================
reg delete "HKCR\NewEmrSign" /f >nul 2>&1

reg add "HKCR\NewEmrSign" /ve /t REG_SZ /d "URL:NewEmrSign" /f
reg add "HKCR\NewEmrSign" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\NewEmrSign\shell" /f
reg add "HKCR\NewEmrSign\shell\open" /f
reg add "HKCR\NewEmrSign\shell\open\command" /ve /t REG_SZ /d "\"C:\NewEmrSign\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM 營養整合系統 - nurti
REM ============================================================
reg delete "HKCR\nurti" /f >nul 2>&1

reg add "HKCR\nurti" /ve /t REG_SZ /d "URL:nurti" /f
reg add "HKCR\nurti" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\nurti\shell" /f
reg add "HKCR\nurti\shell\open" /f
reg add "HKCR\nurti\shell\open\command" /ve /t REG_SZ /d "\"C:\nurti\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM MUSE Editor (MUSE Logon)
REM ============================================================
reg delete "HKCR\MUSE" /f >nul 2>&1

reg add "HKCR\MUSE" /ve /t REG_SZ /d "URL:MUSE" /f
reg add "HKCR\MUSE" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\MUSE\shell" /f
reg add "HKCR\MUSE\shell\open" /f
reg add "HKCR\MUSE\shell\open\command" /ve /t REG_SZ /d "\"C:\Program Files (x86)\MUSE\MUSEEditor.exe\" -museauthenticate -Culture:zh-tw \"%%1\"" /f


REM ============================================================
REM 西醫門診系統 - opdc
REM ============================================================
reg delete "HKCR\opdc" /f >nul 2>&1

reg add "HKCR\opdc" /ve /t REG_SZ /d "URL:opdc" /f
reg add "HKCR\opdc" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\opdc\shell" /f
reg add "HKCR\opdc\shell\open" /f
reg add "HKCR\opdc\shell\open\command" /ve /t REG_SZ /d "\"C:\opdc\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM 暴力通報系統 - RiotSOS
REM ============================================================
reg delete "HKCR\RiotSOS" /f >nul 2>&1

reg add "HKCR\RiotSOS" /ve /t REG_SZ /d "URL:RiotSOS" /f
reg add "HKCR\RiotSOS" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\RiotSOS\shell" /f
reg add "HKCR\RiotSOS\shell\open" /f
reg add "HKCR\RiotSOS\shell\open\command" /ve /t REG_SZ /d "\"C:\opdc\RiotSOS.exe\" \"%%1\"" /f


REM ============================================================
REM 開刀房系統 - orsys
REM ============================================================
reg delete "HKCR\orsys" /f >nul 2>&1

reg add "HKCR\orsys" /ve /t REG_SZ /d "URL:orsys" /f
reg add "HKCR\orsys" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\orsys\shell" /f
reg add "HKCR\orsys\shell\open" /f
reg add "HKCR\orsys\shell\open\command" /ve /t REG_SZ /d "\"C:\orsys\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM PACS 護理站 - HISCallPACS
REM ============================================================
reg delete "HKCR\HISCallPACS" /f >nul 2>&1

reg add "HKCR\HISCallPACS" /ve /t REG_SZ /d "URL:HISCallPACS" /f
reg add "HKCR\HISCallPACS" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\HISCallPACS\shell" /f
reg add "HKCR\HISCallPACS\shell\open" /f
reg add "HKCR\HISCallPACS\shell\open\command" /ve /t REG_SZ /d "\"C:\HISCallPACS\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM 檢查室整合系統 - ISP
REM ============================================================
reg delete "HKCR\ISP" /f >nul 2>&1

reg add "HKCR\ISP" /ve /t REG_SZ /d "URL:ISP" /f
reg add "HKCR\ISP" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\ISP\shell" /f
reg add "HKCR\ISP\shell\open" /f
reg add "HKCR\ISP\shell\open\command" /ve /t REG_SZ /d "\"C:\isp\bin\systemftp_New.exe\" \"%%1\"" /f


REM ============================================================
REM 心導管整合系統 - Cathlist
REM ============================================================
reg delete "HKCR\Cathlist" /f >nul 2>&1

reg add "HKCR\Cathlist" /ve /t REG_SZ /d "URL:Cathlist" /f
reg add "HKCR\Cathlist" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\Cathlist\shell" /f
reg add "HKCR\Cathlist\shell\open" /f
reg add "HKCR\Cathlist\shell\open\command" /ve /t REG_SZ /d "\"C:\Cathlist\systemftp.exe\" \"%%1\"" /f


REM ============================================================
REM NetTerm
REM ============================================================
reg delete "HKCR\Netterm" /f >nul 2>&1

reg add "HKCR\Netterm" /ve /t REG_SZ /d "URL:Netterm" /f
reg add "HKCR\Netterm" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\Netterm\shell" /f
reg add "HKCR\Netterm\shell\open" /f
reg add "HKCR\Netterm\shell\open\command" /ve /t REG_SZ /d "\"C:\NetTerm\netterm.exe\" \"%%1\"" /f


REM ============================================================
REM scoccorball
REM ============================================================
reg delete "HKCR\scoccorball" /f >nul 2>&1

reg add "HKCR\scoccorball" /ve /t REG_SZ /d "URL:scoccorball" /f
reg add "HKCR\scoccorball" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\scoccorball\shell" /f
reg add "HKCR\scoccorball\shell\open" /f
reg add "HKCR\scoccorball\shell\open\command" /ve /t REG_SZ /d "\"C:\ISP\sono\systemftp2.exe\" \"%%1\"" /f


REM ============================================================
REM 排檢程式 - schdual
REM ============================================================
reg delete "HKCR\schdual" /f >nul 2>&1

reg add "HKCR\schdual" /ve /t REG_SZ /d "URL:schdual" /f
reg add "HKCR\schdual" /v "URL Protocol" /t REG_SZ /d "" /f
reg add "HKCR\schdual\shell" /f
reg add "HKCR\schdual\shell\open" /f
reg add "HKCR\schdual\shell\open\command" /ve /t REG_SZ /d "\"C:\schdual\systemftp.exe\" \"%%1\"" /f


echo.
echo ============================================
echo Registry registration completed.
echo ============================================
echo.
pause

endlocal