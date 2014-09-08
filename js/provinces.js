//http://en.wikipedia.org/wiki/Canadian_postal_abbreviations_for_provinces_and_territories
function trouver_le_nom_de_la_province(name){
  if (name == "AB"){
    return "L'Alberta";
  }else if (name == "BC"){
    return "La Colombie-Britannique";
  }else if (name == "MB"){
    return "Le Manitoba";
  }else if (name == "NB"){
    return "Le Nouveau-Brunswick";
  }else if (name == "NL"){
    return "Terre-neuve";
  }else if (name == "NS"){
    return "La Nouvelle-Écosse";
  }else if (name =="NT"){
    return "des Territoires du Nord d'ouest";
  }else if (name == "NU"){
    return "Le Nunavut";
  }else if (name == "ON"){
    return "L'Ontario";
  }else if (name == "PE"){
    return "L'Île du prince Eduard";
  }else if (name == "QC"){
    return "Le Québec";
  }else if (name == "SK"){
    return "La Saskatchewan";
  }else{
    return "Le Yukon";
  }

}

function trouver_le_nom_de_la_province_avec_article_de(name){
  if (name == "AB"){
    return "de l'Alberta";
  }else if (name == "BC"){
    return "de la Colombie-Britannique";
  }else if (name == "MB"){
    return "du Manitoba";
  }else if (name == "NB"){
    return "du Nouveau-Brunswick";
  }else if (name == "NL"){
    return "de Terre-neuve";
  }else if (name == "NS"){
    return "de la Nouvelle-Écosse";
  }else if (name =="NT"){
    return "des Territoires du Nord d'ouest";
  }else if (name == "NU"){
    return "du Nunavut";
  }else if (name == "ON"){
    return "de l'Ontario";
  }else if (name == "PE"){
    return "de l'Île du prince Eduard";
  }else if (name == "QC"){
    return "du Québec";
  }else if (name == "SK"){
    return "de la Saskatchewan";
  }else{
    return "du Yukon";
  }

}
;
