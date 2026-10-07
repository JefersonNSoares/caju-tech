# Implementation Plan: Onboarding & Profile Updates

**Branch**: `feature/onboarding-profile-updates` | **Date**: 2026-10-07 | **Spec**: [specs/004-onboarding-profile-updates/spec.md](spec.md)  
**Input**: Plano aprovado pelo usuário para nova Tela Inicial (SplashScreen) e atualização do fluxo de perfil.

## Summary

Implementar a nova tela de entrada `SplashScreen` com o Logótipo oficial do CajuTech, texto educativo sobre cultivo e derivados do caju, e botão de ação verde "INICIAR" que navega para a tela de Seleção de Perfil. Atualizar o botão de perfil na tela de módulos para "Alterar Perfil" e atualizar o cabeçalho da tela de perfil com o Logótipo oficial do CajuTech.

---

## Constitution Check

- [x] **Zero Telas em Branco (TEL-EST-01)**: Inicialização instantânea sem timeouts assíncronos que congelem a tela.
- [x] **Linguagem e Usabilidade Rural**: Hitbox mínima >= 48x48dp nos botões "INICIAR", "Alterar Perfil" e nas opções de rádio.
- [x] **Regra dos 2 Toques (TEL-NAV-01)**: Da tela inicial, 1 toque ("INICIAR") leva à seleção de perfil e o 2º ("Continuar para a Aplicação") abre os módulos.
- [x] **Consistência Terminológica e Visual**: Paleta verde e terra oficial (`THEME`), rótulo unificado "Alterar Perfil" e componente de logotipo padronizado.

---

## Project Structure

```text
components/
└── common/
    └── CajuTechLogo.tsx         # Componente oficial de logotipo com placeholder

app/
├── index.tsx                    # Redirecionamento da raiz para a SplashScreen
├── (auth)/
│   ├── splash.tsx               # Nova Tela Inicial com logo, texto e botão INICIAR
│   └── login.tsx                # Tela de perfil com cabeçalho atualizado
└── (tabs)/
    └── index.tsx                # Tela de módulos com botão "Alterar Perfil"
```
