@echo off
echo ====================================
echo Complete Git Setup for Dave Auto
echo ====================================
echo.

cd /d "c:\My Web Sites\dave"

echo Please enter your details:
echo.
set /p git_name="Your full name: "
set /p git_email="Your email: "

echo.
echo [1/5] Configuring Git identity...
git config user.name "%git_name%"
git config user.email "%git_email%"

echo.
echo [2/5] Checking status...
git status

echo.
echo [3/5] Committing all files (including all 6 images in assets/images/)...
git commit -m "Initial commit: Dave Auto Solutions complete site with all images"

echo.
echo [4/5] Setting main branch...
git branch -M main

echo.
echo ====================================
echo FILES COMMITTED:
echo ====================================
echo - index.html, admin.html
echo - All CSS and JavaScript
echo - ALL 6 IMAGES in assets/images/:
echo   * hero_mechanic.png
echo   * team_photo.png
echo   * service_diagnostics.png
echo   * spare_parts_store.png
echo   * hybrid_engine.png
echo   * product_oil_can.png
echo - Documentation files
echo.
echo ====================================
echo NEXT STEP: Create GitHub Repository
echo ====================================
echo 1. Go to: https://github.com/new
echo 2. Repository name: dave-auto-solutions
echo 3. Make it PUBLIC (for free Vercel hosting)
echo 4. DO NOT add README, .gitignore, or license
echo 5. Click "Create repository"
echo.
echo 6. Copy the repository URL shown
echo    (looks like: https://github.com/YourUsername/dave-auto-solutions.git)
echo.
echo 7. Then run this command (replace with your URL):
echo    git remote add origin https://github.com/YourUsername/dave-auto-solutions.git
echo    git push -u origin main
echo.
pause
