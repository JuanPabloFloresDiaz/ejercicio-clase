import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, cantidad de personas, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [cantidad, setCantidad] = useState();
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [contador, setContador] = useState(1);

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo cliente
  const agregarCliente = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoCliente = { id: contador, nombre: nombre, fechaReserva: fechaReserva, cantidad: cantidad };
    // Incrementa el contador para el próximo ID único
    setContador(contador + 1);
    // Agrega el nuevo cliente a la lista de clientes
    setClientes([...clientes, nuevoCliente]);
    // Limpia los campos de entrada
    setNombre('');
    setCantidad(0);
    setFechaReserva(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };

  // Función para eliminar un cliente
  const eliminarCliente = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombre}
              onChangeText={setNombre}
            />
            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text>Seleccionar fecha de Reserva</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text style={styles.input}
            >selected: {fechaReserva.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Campo de entrada para la cantidad de personas */}
            <TextInput
              style={styles.input}
              placeholder="Número de personas"
              value={cantidad}
              onChangeText={setCantidad}
            />
            {/* Botón para agregar el cliente */}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.clienteItem}
          >

            {/* Muestra el ID, nombre y fecha de reserva del cliente */}
            <TouchableOpacity
              onPress={() => eliminarCliente(item.id)}>
              <Text>🗑️</Text>
            </TouchableOpacity>
            <Text style={styles.clienteNombre}>{item.id}</Text>
            <Text style={styles.clienteNombre}>Cliente: {item.nombre}</Text>
            <Text style={styles.clienteFecha}>
              Fecha de Reserva: {item.fechaReserva.toDateString()}
            </Text>
            <Text style={styles.clienteFecha}>Cantidad de personas: {item.cantidad}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
});

export default App;
