import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
      <p>
        Një website e-commerce është një platformë online që lehtëson blerjen dhe shitjen e produkteve ose shërbimeve në internet.
        Ai shërben si një treg virtual ku bizneset dhe individët mund të prezantojnë produktet e tyre, të ndërveprojnë me klientët 
        dhe të kryejnë transaksione pa pasur nevojë për një prani fizike. 
       Faqet e e-commerce janë bërë shumë të popullarizuara për shkak të lehtësisë, aksesit dhe shtrirjes globale që ofrojnë.
     </p>

<p>
 Faqet e e-commerce zakonisht shfaqin produkte ose shërbime së bashku me përshkrime të detajuara,
 imazhe, çmime dhe çdo variacion të disponueshëm (p.sh. madhësi, ngjyra). 
 Çdo produkt zakonisht ka faqen e vet të dedikuar me informacionin përkatës.
</p>
      </div>
    </div>
  )
}

export default DescriptionBox
