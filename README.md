# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# UI Part-3
# step-1 : we are fixing one bug that is if i refresh the app automatically user is getting logout
- Actual workflow - when the user get's logout then token should expire
- but here if we refresh user is getting logout but in the cookies token is there. So user should not logout
# Solution
- in body page we will fetch user from profile view api and store it in store, then it won't logout. Is any error occur will navigate to login page.
# Security Check 
- without login you should not login to other routes &if token is not there ? then it should redirect to login page.