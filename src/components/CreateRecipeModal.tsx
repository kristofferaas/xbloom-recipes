import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

interface CreateRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRIND_SIZES = ["Extra Fine", "Fine", "Medium-Fine", "Medium", "Medium-Coarse", "Coarse"];
const BREW_METHODS = ["Pour Over", "French Press", "Espresso", "AeroPress", "Cold Brew", "Moka Pot", "Drip"];

export function CreateRecipeModal({ isOpen, onClose }: CreateRecipeModalProps) {
  const createRecipe = useMutation(api.recipes.create);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coffeeAmount, setCoffeeAmount] = useState("18");
  const [waterAmount, setWaterAmount] = useState("300");
  const [grindSize, setGrindSize] = useState("Medium");
  const [brewTimeMinutes, setBrewTimeMinutes] = useState("3");
  const [brewTimeSeconds, setBrewTimeSeconds] = useState("30");
  const [temperature, setTemperature] = useState("93");
  const [method, setMethod] = useState("Pour Over");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setCoffeeAmount("18");
    setWaterAmount("300");
    setGrindSize("Medium");
    setBrewTimeMinutes("3");
    setBrewTimeSeconds("30");
    setTemperature("93");
    setMethod("Pour Over");
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createRecipe({
        name,
        description,
        coffeeAmount: parseFloat(coffeeAmount),
        waterAmount: parseFloat(waterAmount),
        grindSize,
        brewTime: parseInt(brewTimeMinutes) * 60 + parseInt(brewTimeSeconds),
        temperature: parseFloat(temperature),
        method,
        notes: notes || undefined,
      });
      resetForm();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">New Recipe</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form">
              <div className="form-group">
                <label className="form-label">Recipe Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ethiopian Light Roast"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A bright and fruity pour-over..."
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Coffee (g)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={coffeeAmount}
                    onChange={(e) => setCoffeeAmount(e.target.value)}
                    min="1"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Water (ml)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={waterAmount}
                    onChange={(e) => setWaterAmount(e.target.value)}
                    min="1"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Grind Size</label>
                <select
                  className="form-input"
                  value={grindSize}
                  onChange={(e) => setGrindSize(e.target.value)}
                >
                  {GRIND_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Brew Time (min)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={brewTimeMinutes}
                    onChange={(e) => setBrewTimeMinutes(e.target.value)}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brew Time (sec)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={brewTimeSeconds}
                    onChange={(e) => setBrewTimeSeconds(e.target.value)}
                    min="0"
                    max="59"
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Temperature (°C)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    min="0"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brew Method</label>
                  <select
                    className="form-input"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    {BREW_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  style={{ minHeight: "80px" }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
