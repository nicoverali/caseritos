const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            colors: {
                'body-color': colors.gray["100"],
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                'home-hero': "url('../img/home_background_1.jpg')",
                'welcome-bg': "url('../img/welcome_background.jpg')",
            })
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            borderWidth: ['hover', 'group-hover'],
            padding: ['group-hover'],
            borderRadius: ['first', 'last'],
            borderWidth: ['first', 'last'],
            textAlign: ['first', 'last']
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
