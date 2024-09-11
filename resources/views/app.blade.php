<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        <!--Verantwortlich dafür alle 'routen' zu registrierten und diese für React Komponenten
        verfügbar zu machen-->
        @routes
        <!--Verantwortlich dafür, dass der Browser erneut lädt, wenn Änderung in der React App vorgenommen werden-->
        @viteReactRefresh
        <!--Lädt app.jsx und alle dazugehörigen jsx Komponenten (Ermöglicht eine high performance Single Page App)-->
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        <!--Verantwortlich für das Generieren von  Metatext-->
        @inertiaHead
    </head>
    <body class="font-sans antialiased dark">
    <!--Rendert die main application-->
        @inertia
    </body>
</html>
