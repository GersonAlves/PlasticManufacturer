using System.Collections.Generic;

namespace PlasticManufacturer.Domain.Entities.Adresses
{
    public class State: Entity
    {
        public virtual IList<City> Cities { get; set; }

        public virtual void AddCity(City city)
        {
            if (this.Cities == null)
                this.Cities = new List<City>();

            this.Cities.Add(city);
        }
    }
}