import {
  ApiResponse,
  CreatedEntity,
  RegisterEntidad,
} from "./types/register-entidad";

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a unique ID for the entity
 */
const generateId = (): string => {
  return `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Simulates entity creation API call
 */
export const createEntity = async (
  data: RegisterEntidad
): Promise<ApiResponse> => {
  try {
    // Simulate network delay
    await delay(2000);

    // Simulate random API failure (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Error del servidor: No se pudo crear la entidad");
    }

    // Create the entity with additional metadata
    const createdEntity: CreatedEntity = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      status: "active",
    };

    // Store in localStorage for demo purposes
    const existingEntities = JSON.parse(
      localStorage.getItem("entities") || "[]"
    );
    existingEntities.push(createdEntity);
    localStorage.setItem("entities", JSON.stringify(existingEntities));

    return {
      success: true,
      data: createdEntity,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

/**
 * Retrieves an entity by ID
 */
export const getEntityById = async (
  id: string
): Promise<CreatedEntity | null> => {
  await delay(500); // Simulate network delay

  const entities = JSON.parse(localStorage.getItem("entities") || "[]");
  return entities.find((entity: CreatedEntity) => entity.id === id) || null;
};
