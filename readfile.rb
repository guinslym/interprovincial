require 'csv'
require 'json'

class Province
	attr_accessor :provOrigine, :destination, :total, 
					:q1, :q2, :q3, :q4

	def initialize(line)
		@provOrigine =  line.split(';').first.split(",").first
		@destination =  line.split(';').at(1).split(',').first
		@q1 = (line.split(';').at(4)).to_i
		@q2 = (line.split(';').at(5)).to_i
		@q3 = (line.split(';').at(6)).to_i
		@q4 = (line.split(';').at(7)).to_i
	end

	def total
		return (@q1 + @q2 + @q3 + @q4)
	end

end

##########################################################################
##########################################################################
##########################################################################


def trouver_le_nombre_total_de_migrant_pour_cette_province(provinces, nom)
	total = 0
	provinces.each do |n| 
		if n.provOrigine.eql?(nom)
			#puts n.destination + n.total.to_s
			total += n.total
		end
	end
	return total
end

# cette variable me servira pour créer un fichier json.
nos_provinces = {
	'Nunavut'.to_sym => {:province => 'Nunavut', :abbr => 'NU', :population => '31906', :position => 12, :p_matrice => [1,2,2,2,1,1,1,2,3,4,2,1,0], :serie_statistique => [49,17,71,16,53,394,109,45,213,56,9,73]},
	'Colombie-Britannique'.to_sym => {:province => 'Colombie-Britannique', :abbr => "CB", :population => '4400057', :position => 9, :p_matrice => [6,6,6,6,5,4,3,2,1,0,1,2,3], :serie_statistique => [389,245,1352,532,2132,12197,2274,3684,29035,441,344,196]},
	'Alberta'.to_sym => {:province => 'Alberta', :abbr => "AB", :population => '3645257', :position => 8, :p_matrice => [5,5,5,5,4,3,2,1,0,1,2,1,2], :serie_statistique => [2893,399,2477,1813,2236,15347,3622,9526,22693,262,455,152]},
	'Saskatchewan'.to_sym => {:province => 'Saskatchewan', :abbr => 'SK' ,:population => '1033381', :position => 7, :p_matrice => [3,3,3,3,1,1,1,0,1,2,3,1,2], :serie_statistique => [68,64,256,139,355,3393,2068,10751,3154,80,100,13]},
	'Manitoba'.to_sym => {:province => 'Manitoba', :abbr => 'MB', :population => '1208268', :position => 6, :p_matrice => [3,3,3,3,2,1,0,1,2,3,4,2,1], :serie_statistique => [233,45,269,226,605,4648,2603,6389,2935,4,54,109]},
	'Ontario'.to_sym => {:province => 'Ontario', :abbr => 'ON', :population => '12851821', :position => 5, :p_matrice => [2,2,2,2,1,0,1,2,3,4,5,3,1], :serie_statistique => [2629,1054,5175,3140,14693,4221,4144,34607,12907,234,405,359]},
	'Québec'.to_sym => {:province => 'Québec', :abbr => "QC", :population => '7903001' , :position => 4, :p_matrice => [1,1,1,1,0,1,2,3,4,5,6,4,1], :serie_statistique => [263,225,936,1529,20841,621,525,7312,2931,98,29,250]},
	'Nouveau-Brunswick'.to_sym => {:province => 'Nouveau-Brunswick', :abbr => 'NB', :population => '751171', :position => 3, :p_matrice => [2,1,1,0,1,2,3,4,5,6,7,5,2], :serie_statistique => [419,423,2155,1475,3787,242,285,4384,931,35,36,69]},
	'Nouvelle-Écosse'.to_sym => {:province => 'Nouvelle-Écosse', :abbr => 'NS', :population => '921727', :position => 2, :p_matrice => [1,1,0,1,2,3,4,5,6,7,8,6,2], :serie_statistique => [1124,489,2601,580,5644,308,451,5730,1421,49,184,28]},
	'Île-du-Prince-Édouard'.to_sym => {:province => 'Île-du-Prince-Édouard', :abbr => 'PE', :population => '140204' , :position => 1, :p_matrice => [1,0,1,1,1,2,3,4,5,6,7,5,2], :serie_statistique => [53,543,688,226,1282,35,116,840,183,10,0,42]},
	'Terre-Neuve-et-Labrador'.to_sym => {:province => 'Terre-Neuve-et-Labrador', :abbr => 'NL' ,:population => '514536', :position => 0, :p_matrice => [0,1,1,2,1,2,3,4,5,6,7,5,1], :serie_statistique => [160,1149,429,322,2344,137,203,4458,548,6,85,114]},
	'Territoires du Nord-Ouest'.to_sym => {:province => 'Territoires du Nord-Ouest', :abbr => 'NT', :population => '41462', :position => 11, :p_matrice => [5,5,5,5,4,3,2,1,1,1,1,0,1], :serie_statistique => [19,0,131,68,98,358,10,136,1048,397,255,47]},
	"Yukon".to_sym => {:province => "Yukon", :abbr => 'YT' ,:population => '33897', :position => 10, :p_matrice => [7,7,7,7,6,5,4,3,2,1,0,1,2], :serie_statistique => [15,0,70,21,157,294,8,91,269,793,120,20]}
}


#Ce programme ne peut que lire le fichier en francais
#Le fichier est mal délimité, c'est pourquoi que j'utilise l'objet 'File' au lieu de 'CSV'
contenu_du_fichier = File.open("migrant.csv", "r") 
#Formatter le fichier en enlevant l'entête et le pied de page


instances_de_provinces = []
contenu_du_fichier.each_line do |line|
	instances_de_provinces << Province.new(line)

end

#Trier les provinces par leur nom d'origine
instances_de_provinces.sort! { |a,b| a.provOrigine <=> b.provOrigine }

nos_provinces.each do |n|
	total = trouver_le_nombre_total_de_migrant_pour_cette_province(instances_de_provinces, n.first.to_s)
	nos_provinces[n.first].merge!(:total => total)
end


######################################################################################
######################################################################################
######################################################################################
#creation de fichier csv

column_header = ["provOrigin", "destination", "total", "nbr_pourcentage"]
CSV.open("file.csv", "wb", :write_headers=> true, :headers => column_header) do |csv|
	instances_de_provinces.each do |n|
		#pourcentage = trouver_le_nombre_total_de_migrant_pour_cette_province(copy_instances_de_provinces, n.provOrigine)
		provOrigine = nos_provinces[n.provOrigine.to_sym][:abbr]
		destination = nos_provinces[n.destination.to_sym][:abbr]
		pourcentage = (((n.total * 1.0)  / ((nos_provinces[n.provOrigine.to_sym][:total]) * 1.0)) * 100).floor 
		csv << [provOrigine, destination, n.total, pourcentage ]

	end
  # ...
end

#optionnel ; création d'un fichier json
File.open("fle_json.json","w") do |f|
  f.write(nos_provinces.to_json)
end


