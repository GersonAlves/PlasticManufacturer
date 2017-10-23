using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;
using System.Web.Http.Cors;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class PelletsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Pellets
        public IQueryable<Pellet> GetPellets()
        {
            return db.Pellets;
        }

        // GET: api/Pellets/5
        [ResponseType(typeof(Pellet))]
        public async Task<IHttpActionResult> GetPellet(int id)
        {
            Pellet pellet = await db.Pellets.FindAsync(id);
            if (pellet == null)
            {
                return NotFound();
            }

            return Ok(pellet);
        }

        // PUT: api/Pellets/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPellet(int id, Pellet pellet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pellet.Id)
            {
                return BadRequest();
            }

            db.Entry(pellet).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PelletExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Pellets
        [ResponseType(typeof(Pellet))]
        public async Task<IHttpActionResult> PostPellet(Pellet pellet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pellets.Add(pellet);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = pellet.Id }, pellet);
        }

        // DELETE: api/Pellets/5
        [ResponseType(typeof(Pellet))]
        public async Task<IHttpActionResult> DeletePellet(int id)
        {
            Pellet pellet = await db.Pellets.FindAsync(id);
            if (pellet == null)
            {
                return NotFound();
            }

            db.Pellets.Remove(pellet);
            await db.SaveChangesAsync();

            return Ok(pellet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PelletExists(int id)
        {
            return db.Pellets.Count(e => e.Id == id) > 0;
        }
    }
}