# Waiting - Backlog

1. EntitiesView.tsx — dual-mode god component  


The component uses pieces ? to branch between two entirely different modes (entity list vs piece  
 grid). This is the boolean-flag anti-pattern — two components masquerading as one. The Props type  
 reflects this: half the props only apply to one mode.

Senior fix: split into EntitiesView (entities) and PiecesView (pieces). Each gets a clean, minimal  
 props type with no dead/conditional fields.

---

2. EntityCard.tsx — click propagation bug  


The <li> is clickable (onClick={onClick}), but the Delete and Edit buttons inside it don't call  
 e.stopPropagation(). Clicking Delete fires both the delete handler and the parent navigation click —
a silent interaction bug in production.

Senior fix: stop propagation in the button wrappers, or restructure so the action buttons sit outside
the clickable area.

---

Bonus (quick win): PieceCard.tsx — hardcoded strings in a multilingual app

"No image" and "Sold" are hardcoded English. The app already has i18n infrastructure — these should  
 be translation keys.  

