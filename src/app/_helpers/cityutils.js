
export const hasSamePostcode = (cp1, cp2) => cp1.filter(cp => cp2.includes(cp)).length > 0;

export const removeDuplicateCommunes = (cities) => {
  cities.reduce((accumulator, current) => {
    if (!accumulator.find((city) => city.code === current.code)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
}
