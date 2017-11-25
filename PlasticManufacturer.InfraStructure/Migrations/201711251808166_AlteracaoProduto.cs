namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoProduto : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Code", c => c.String());
            AddColumn("dbo.Products", "Ratio", c => c.String());
            AddColumn("dbo.Products", "Compound", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "Price");
            DropColumn("dbo.Products", "Compound");
            DropColumn("dbo.Products", "Ratio");
            DropColumn("dbo.Products", "Code");
        }
    }
}
