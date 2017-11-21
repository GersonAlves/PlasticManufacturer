namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alteracaoColorMatcNotes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ColorMatchRequests", "LabNotes", c => c.String());
            AddColumn("dbo.ColorMatchRequests", "ShippingNotes", c => c.String());
            AddColumn("dbo.ColorMatchRequests", "Label", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ColorMatchRequests", "Label");
            DropColumn("dbo.ColorMatchRequests", "ShippingNotes");
            DropColumn("dbo.ColorMatchRequests", "LabNotes");
        }
    }
}
