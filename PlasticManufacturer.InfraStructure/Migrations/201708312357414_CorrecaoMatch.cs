namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrecaoMatch : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ColorMatchRequests", "RequiredCustomerQty", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.ColorMatchRequests", "Lubricant", c => c.String());
            DropColumn("dbo.ColorMatchRequests", "ConcentrateQty");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ColorMatchRequests", "ConcentrateQty", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.ColorMatchRequests", "Lubricant");
            DropColumn("dbo.ColorMatchRequests", "RequiredCustomerQty");
        }
    }
}
