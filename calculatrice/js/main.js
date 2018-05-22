function Calculator()
{
	that = this,
	this.field = "input#number", 
	this.button = "#body .buttons, .clear" 
	this.init = false,

	this.run = function()
	{
		$(this.button).click(function() { /*"quand un bouton est cliqué". Click est une méthode de jquery*/
			var value = $(this).html(); /* Lors du click, je récupère la valeur comprise dans les balises html de mes boutons */

			if (that.init == false)
			{
				$(that.field).val(""); /* valeur par défault  qui s'affiche quand on tape des chiffres dans la calculette */
				that.init = true;
			}

			if (value != "=")
				$(that.field).val($(that.field).val() + value);

			that.dispatcher(value);
			/* 	Commentaire explicatif du code ci-dessus :
				- (that.field) : that est définit plus haut comme = à this. On utilise that car on est dans une fonction jquery, si o avait utilisé this, il ne l'aurait pas connu
				- if (that.init == false) : Si le champ init est égal à false, le champ aura comme valeur par défault "rien". -> le zéro qui s'affiche lors du premier affichage disparait
				- if (value != "=") : Ce is nous aide à ne pas afficher le = lorsque l'on clique dessus.
				- .val($(that.field).val() + value) : Une fois que l'on à cliqué sur un bouton, notre champ à pour valeur la  valeur actuelle du champ + la nouvelle valeur rentrée.
				- that.dispatcher(value); : On appelle le dispatcher et on lui donne la valeur reçue

			*/
		});


	},

	this.dispatcher = function(value) /* on peut réutiliser this car on n'est plu dans une fonction jquery */
	{
		if ($(this.field).val().indexOf("/") != -1)
			this.operation(value, "/");
		/* code ci dessus :
		- if ($(this.field).val().indexOf("/") != -1 : Si on trouve un / dans ce qui est tapé
		- this.operation(value, "/"); : On s'oriente vers une division. On voit que dans la méthode ci dessous this.operation, on affiche bien function(value, symbol)
		- On fait la même chose pour toutes les autres opérations.
		*/
		if ($(this.field).val().indexOf("*") != -1)
			this.operation(value, "*");
		if ($(this.field).val().indexOf("-") != -1)
			this.operation(value, "-");
		if ($(this.field).val().indexOf("+") != -1)
			this.operation(value, "+");
	},

	this.operation = function(value, symbol)
	{
		var numbers = $(this.field).val().split(symbol), /* split permet de séparer les valeurs sous forme d'array et dès qu'il toruve un symbol il va le sortir des valeurs */ 
			result; /* result sera le résultat final */

		if (symbol == "/")
			result = parseFloat(numbers[0]) / parseFloat(numbers[1]); /* si le symbole est divisé (/), alors on prend le premier élément du tabelau et on le divise par le second */
		if (symbol == "*")
			result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
		if (symbol == "-")
			result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
		if (symbol == "+")
			result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
		/* parseFloat : Je dis à js que je ne veux pas concaténer deux variable comme 1 + "blablabla" = " 1 blablabla" mais je veux ajouter deux nombre entre eux */

		result = Math.round((result) * 100) / 100; /* On indique que notre résultat aura deux chiffres après la virgule */
 
		if (numbers.length > 1)
		{
			if (value == "=") /* si on clique sur égale */
				$(this.field).val(result); /* on affiche le résultat */
			else if (numbers.length > 2) /*si le tableau contient plus de 2 nombres */
				$(this.field).val(result + symbol); /* la valeur du champ sera le résultat obtenu + sune concaténation du symbole */

		}
	};
}
