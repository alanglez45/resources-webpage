import { resources } from "./dataIndex.js";

// export let categorias = [
//     "AI",
//     "APIS",
//     "AWS",
//     "BROWSER EXTENSIONS",
//     "CODING PRACTICE",
//     "COLOR PALETTES",
//     "COURSES",
//     "CSS",
//     "DEPLOYMENT",
//     "CSS TOOLS",
//     "DATA STRUCTURES & ALGORITHMS",
//     "DEVOPS",
//     "DOCUMENTATION",
//     "ERRORS | SOLUTIONS",
//     "FONTS",
//     "GIT",
//     "HTML",
//     "ICONS",
//     "IMAGES",
//     "IMAGES TOOLS",
//     "INTERVIEWS",
//     "JAVA",
//     "JS",
//     "JS LIBRARIES",
//     "MARKDOWN",
//     "NODEJS-DATABASE",
//     "NODEJS-EXPRESS",
//     "OTHERS",
//     "PYTHON",
//     "REACT",
//     "REACT LIBRARIES",
//     "REGULAR EXPRESSIONS",
//     "REPOSITORIES",
//     "SQL",
//     "TUTORIALS",
//     "USEFUL TOOLS",
//     "UX",
//     "VSCODE EXTENSIONS"
// ];

export const getUniqueCategories = () => {
    const categories = new Set();

    resources.forEach(resource => {
        if (resource.category) {
            categories.add(resource.category);
        }
    });

    // convertir set a array y ordenar alfabéticamente
    return Array.from(categories).sort();
};
